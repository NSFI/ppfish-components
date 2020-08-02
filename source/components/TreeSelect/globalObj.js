/*
* 全局数据对象
* 
*/
const globalObj={
    beforeSearchCheckKeys:{},//搜索前已经被选择的节点KEY列表，可以给用户判断执行反选还是正选
    isInSearch:false,//标记当前处于搜索状态
    filteredTreeNodes:[],//搜索状态下的树节点列表
    treeNodes:[]//搜索状态下的原树节点列表
};

export default globalObj;