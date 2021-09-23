import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import ResizeObserver from '../ResizeObserver';
import Item from './Item';
import useIsomorphicLayoutEffect from '../../../../hooks/useIsomorphicLayoutEffect';
import { useBatchFrameState } from './hooks/useBatchFrameState';
import RawItem from './RawItem';

export const OverflowContext = React.createContext<{
  prefixCls: string;
  responsive: boolean;
  order: number;
  registerSize: (key: React.Key, width: number | null) => void;
  display: boolean;

  invalidate: boolean;

  // Item Usage
  item?: any;
  itemKey?: React.Key;

  // Rest Usage
  className?: string;
}>(null);

const RESPONSIVE = 'responsive' as const;
const INVALIDATE = 'invalidate' as const;

export type ComponentType =
  | React.ComponentType<any>
  | React.ForwardRefExoticComponent<any>
  | React.FC<any>
  | keyof React.ReactHTML;

export interface OverflowProps<ItemType> extends React.HTMLAttributes<any> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  data?: ItemType[];
  itemKey?: React.Key | ((item: ItemType) => React.Key);
  /** Used for `responsive`. It will limit render node to avoid perf issue */
  itemWidth?: number;
  renderItem?: (item: ItemType) => React.ReactNode;
  /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
  renderRawItem?: (item: ItemType, index: number) => React.ReactElement;
  maxCount?: number | typeof RESPONSIVE | typeof INVALIDATE;
  renderRest?: React.ReactNode | ((omittedItems: ItemType[]) => React.ReactNode);
  /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
  renderRawRest?: (omittedItems: ItemType[]) => React.ReactElement;
  suffix?: React.ReactNode;
  component?: ComponentType;
  itemComponent?: ComponentType;

  /** @private This API may be refactor since not well design */
  onVisibleChange?: (visibleCount: number) => void;

  /** When set to `full`, ssr will render full items by default and remove at client side */
  ssr?: 'full';
}

function defaultRenderRest<ItemType>(omittedItems: ItemType[]) {
  return `+ ${omittedItems.length} ...`;
}

function Overflow<ItemType = any>(props: OverflowProps<ItemType>, ref: React.Ref<HTMLDivElement>) {
  const {
    prefixCls = 'rc-overflow',
    data = [],
    renderItem,
    renderRawItem,
    itemKey,
    itemWidth = 10,
    ssr,
    style,
    className,
    maxCount,
    renderRest,
    renderRawRest,
    suffix,
    component: Component = 'div',
    itemComponent,
    onVisibleChange,
    ...restProps
  } = props;

  const createUseState = useBatchFrameState();

  const fullySSR = ssr === 'full';

  const [containerWidth, setContainerWidth] = createUseState<number>(null);
  const mergedContainerWidth = containerWidth || 0;

  const [itemWidths, setItemWidths] = createUseState(new Map<React.Key, number>());

  const [prevRestWidth, setPrevRestWidth] = createUseState(0);
  const [restWidth, setRestWidth] = createUseState(0);

  const [suffixWidth, setSuffixWidth] = createUseState(0);
  const [suffixFixedStart, setSuffixFixedStart] = useState<number>(null);

  const [displayCount, setDisplayCount] = useState(null);
  const mergedDisplayCount = React.useMemo(() => {
    if (displayCount === null && fullySSR) {
      return Number.MAX_SAFE_INTEGER;
    }

    return displayCount || 0;
  }, [displayCount, containerWidth]);

  const [restReady, setRestReady] = useState(false);

  const itemPrefixCls = `${prefixCls}-item`;

  // Always use the max width to avoid blink
  const mergedRestWidth = Math.max(prevRestWidth, restWidth);

  // ================================= Data =================================
  const isResponsive = data.length && maxCount === RESPONSIVE;
  const invalidate = maxCount === INVALIDATE;

  /**
   * When is `responsive`, we will always render rest node to get the real width of it for calculation
   */
  const showRest = isResponsive || (typeof maxCount === 'number' && data.length > maxCount);

  const mergedData = useMemo(() => {
    let items = data;

    if (isResponsive) {
      if (containerWidth === null && fullySSR) {
        items = data;
      } else {
        items = data.slice(0, Math.min(data.length, mergedContainerWidth / itemWidth));
      }
    } else if (typeof maxCount === 'number') {
      items = data.slice(0, maxCount);
    }

    return items;
  }, [data, itemWidth, containerWidth, maxCount, isResponsive]);

  const omittedItems = useMemo(() => {
    if (isResponsive) {
      return data.slice(mergedDisplayCount + 1);
    }
    return data.slice(mergedData.length);
  }, [data, mergedData, isResponsive, mergedDisplayCount]);

  // ================================= Item =================================
  const getKey = useCallback(
    (item: ItemType, index: number) => {
      if (typeof itemKey === 'function') {
        return itemKey(item);
      }
      return (itemKey && (item as any)?.[itemKey]) ?? index;
    },
    [itemKey],
  );

  const mergedRenderItem = useCallback(renderItem || ((item: ItemType) => item), [renderItem]);

  function updateDisplayCount(count: number, notReady?: boolean) {
    setDisplayCount(count);
    if (!notReady) {
      setRestReady(count < data.length - 1);

      onVisibleChange?.(count);
    }
  }

  // ================================= Size =================================
  function onOverflowResize(_: object, element: HTMLElement) {
    setContainerWidth(element.clientWidth);
  }

  function registerSize(key: React.Key, width: number | null) {
    setItemWidths(origin => {
      const clone = new Map(origin);

      if (width === null) {
        clone.delete(key);
      } else {
        clone.set(key, width);
      }
      return clone;
    });
  }

  function registerOverflowSize(_: React.Key, width: number | null) {
    setRestWidth(width!);
    setPrevRestWidth(restWidth);
  }

  function registerSuffixSize(_: React.Key, width: number | null) {
    setSuffixWidth(width!);
  }

  // ================================ Effect ================================
  function getItemWidth(index: number) {
    return itemWidths.get(getKey(mergedData[index], index));
  }

  useIsomorphicLayoutEffect(() => {
    if (mergedContainerWidth && mergedRestWidth && mergedData) {
      let totalWidth = suffixWidth;

      const len = mergedData.length;
      const lastIndex = len - 1;

      // When data count change to 0, reset this since not loop will reach
      if (!len) {
        updateDisplayCount(0);
        setSuffixFixedStart(null);
        return;
      }

      for (let i = 0; i < len; i += 1) {
        const currentItemWidth = getItemWidth(i);

        // Break since data not ready
        if (currentItemWidth === undefined) {
          updateDisplayCount(i - 1, true);
          break;
        }

        // Find best match
        totalWidth += currentItemWidth;

        if (
          // Only one means `totalWidth` is the final width
          (lastIndex === 0 && totalWidth <= mergedContainerWidth) ||
          // Last two width will be the final width
          (i === lastIndex - 1 && totalWidth + getItemWidth(lastIndex)! <= mergedContainerWidth)
        ) {
          // Additional check if match the end
          updateDisplayCount(lastIndex);
          setSuffixFixedStart(null);
          break;
        } else if (totalWidth + mergedRestWidth > mergedContainerWidth) {
          // Can not hold all the content to show rest
          updateDisplayCount(i - 1);
          setSuffixFixedStart(totalWidth - currentItemWidth - suffixWidth + restWidth);
          break;
        }
      }

      if (suffix && getItemWidth(0) + suffixWidth > mergedContainerWidth) {
        setSuffixFixedStart(null);
      }
    }
  }, [mergedContainerWidth, itemWidths, restWidth, suffixWidth, getKey, mergedData]);

  // ================================ Render ================================
  const displayRest = restReady && !!omittedItems.length;

  let suffixStyle: React.CSSProperties = {};
  if (suffixFixedStart !== null && isResponsive) {
    suffixStyle = {
      position: 'absolute',
      left: suffixFixedStart,
      top: 0,
    };
  }

  const itemSharedProps = {
    prefixCls: itemPrefixCls,
    responsive: isResponsive,
    component: itemComponent,
    invalidate,
  };

  // >>>>> Choice render fun by `renderRawItem`
  const internalRenderItemNode = renderRawItem
    ? (item: ItemType, index: number) => {
        const key = getKey(item, index);

        return (
          <OverflowContext.Provider
            key={key}
            value={{
              ...itemSharedProps,
              order: index,
              item,
              itemKey: key,
              registerSize,
              display: index <= mergedDisplayCount,
            }}
          >
            {renderRawItem(item, index)}
          </OverflowContext.Provider>
        );
      }
    : (item: ItemType, index: number) => {
        const key = getKey(item, index);

        return (
          <Item
            {...itemSharedProps}
            order={index}
            key={key}
            item={item}
            renderItem={mergedRenderItem}
            itemKey={key}
            registerSize={registerSize}
            display={index <= mergedDisplayCount}
          />
        );
      };

  // >>>>> Rest node
  let restNode: React.ReactNode;
  const restContextProps = {
    order: displayRest ? mergedDisplayCount : Number.MAX_SAFE_INTEGER,
    className: `${itemPrefixCls}-rest`,
    registerSize: registerOverflowSize,
    display: displayRest,
  };

  if (!renderRawRest) {
    const mergedRenderRest = renderRest || defaultRenderRest;

    restNode = (
      <Item
        {...itemSharedProps}
        // When not show, order should be the last
        {...restContextProps}
      >
        {typeof mergedRenderRest === 'function' ? mergedRenderRest(omittedItems) : mergedRenderRest}
      </Item>
    );
  } else if (renderRawRest) {
    restNode = (
      <OverflowContext.Provider
        value={{
          ...itemSharedProps,
          ...restContextProps,
        }}
      >
        {renderRawRest(omittedItems)}
      </OverflowContext.Provider>
    );
  }

  let overflowNode = (
    <Component
      className={classNames(!invalidate && prefixCls, className)}
      style={style}
      ref={ref}
      {...restProps}
    >
      {mergedData.map(internalRenderItemNode)}

      {/* Rest Count Item */}
      {showRest ? restNode : null}

      {/* Suffix Node */}
      {suffix && (
        <Item
          {...itemSharedProps}
          order={mergedDisplayCount}
          className={`${itemPrefixCls}-suffix`}
          registerSize={registerSuffixSize}
          display
          style={suffixStyle}
        >
          {suffix}
        </Item>
      )}
    </Component>
  );

  if (isResponsive) {
    overflowNode = <ResizeObserver onResize={onOverflowResize}>{overflowNode}</ResizeObserver>;
  }

  return overflowNode;
}

const ForwardOverflow = React.forwardRef(Overflow);

type ForwardOverflowType = <ItemType = any>(
  props: React.PropsWithChildren<OverflowProps<ItemType>> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

type FilledOverflowType = ForwardOverflowType & {
  Item: typeof RawItem;
  RESPONSIVE: typeof RESPONSIVE;
  /** Will work as normal `component`. Skip patch props like `prefixCls`. */
  INVALIDATE: typeof INVALIDATE;
};

ForwardOverflow.displayName = 'Overflow';

(ForwardOverflow as unknown as FilledOverflowType).Item = RawItem;
(ForwardOverflow as unknown as FilledOverflowType).RESPONSIVE = RESPONSIVE;
(ForwardOverflow as unknown as FilledOverflowType).INVALIDATE = INVALIDATE;

// Convert to generic type
export default ForwardOverflow as unknown as FilledOverflowType;
