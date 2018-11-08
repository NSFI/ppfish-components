import React from "react";
import marked from 'marked';
import Timeline from '../../../source/components/Timeline/index.tsx';
import upgradeNotes from '../../docs/upgradeNotes/版本升级说明.md';
import './index.less';

export default class ChangeLog extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = new marked.Renderer();
  }

  render() {
    const changeLog = marked(upgradeNotes).split('<hr>').reverse();
    return (
      <div className="changelog">
        <h1 className="changelog-title">更新日志</h1>
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
