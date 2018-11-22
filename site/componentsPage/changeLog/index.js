import React from "react";
import marked from 'marked';
import Timeline from '../../../source/components/Timeline/index.tsx';
import upgradeNotes from '../../docs/upgradeNotes/版本升级说明.md';
import './index.less';

export default class ChangeLog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const changeLog = marked(upgradeNotes).split('<hr>').reverse();
    return (
      <div className="changelog">
        <h1 className="changelog-title">更新日志</h1>
        <div className="changelog-description">
          <h3>Emoji表情说明</h3>
          <ul>
            <li>🎊 新增特性，如新增组件、 API等</li>
            <li>🔨 视觉调整、交互调整、功能优化等</li>
            <li>🐛 bug修复</li>
            <li>☠ 废弃特性，如废弃组件、 API等</li>
            <li>🔥 变化较大，需要重点关注的更新</li>
          </ul>
        </div>
        <Timeline className="changelog-timeline">
          {
            changeLog.map((log, i) => (
              <Timeline.Item key={i}>
                <div dangerouslySetInnerHTML={{__html: log}}/>
              </Timeline.Item>
            ))
          }
        </Timeline>
      </div>
    );
  }
}
