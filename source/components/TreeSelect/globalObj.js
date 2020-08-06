/*
* 全局数据对象
* 页面存在多个树形控件，会存在全局污染风险，beforeSearchSyncCheckKeys已经移到树对象实例里
*/
const globalObj={
    beforeSearchCheckKeys:{},//搜索前已经被选择的节点KEY列表，可以给用户判断执行反选还是正选
    //beforeSearchSyncCheckKeys:[],//搜索前选择的节点，会在搜索后的操作中同步更新,保持搜索前后选择的节点同步
    isInSearch:false,//标记当前处于搜索状态
    filteredTreeNodes:[],//搜索状态下的树节点列表
    treeNodes:[]//搜索状态下的原树节点列表
};

export default globalObj;