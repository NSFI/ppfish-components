let _iframeC=function (p){
  let _W=window;
    _W._MsgCBS={};
    let _PWin=window.parent?window.parent:null;
    let _PM=null;
    let _cbnamexds_index=0;
    let _cbnamexds=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
    try{
      if(_PWin.$forIFR){
        _PM=_PWin.$forIFR;
      }
    }catch(e){

    }
    let _execMethod=function(name,query){
      if(_PM){
        _PM[name](query,_W);
      }else{
        _PWin.postMessage({method:name,params:query},"*");
      }
    };
    let _addToCBS=function(name,query,cb){
      let oldCB;
      if(cb){
         oldCB=_W._MsgCBS[name];
         if(oldCB){
            name=name+"_"+_cbnamexds[_cbnamexds_index];
            _cbnamexds_index++;
            _W._MsgCBS[name]=cb;
            
         }else{
           _W._MsgCBS[name]=cb;
         }
         query._cb=name;
      }
    };
    p.sheetOpenCreate=function(query){
      _execMethod("sheetOpenCreate",query);
    };

    p.sheetToDetail=function(query){
      _execMethod("sheetToDetail",query);
    };

    p.sheetToRelative=function(query){
      _execMethod("sheetToRelative",query);
    };

    p.openSelectKefu=function(query,cb){
      _addToCBS("openSelectKefu_cb",query,cb);
      _execMethod("openSelectKefu",query);
     
    };
    p.openMulSelectKefu=function(query,cb){
      _addToCBS("openMulSelectKefu_cb",query,cb);
      _execMethod("openMulSelectKefu",query);
    };

    p.startSessions=function(sesList){
      _execMethod("startSessions",sesList);
    };
    p.getContainerData=function(query,cb){
      if(!query){
        query={setting:{},crmSetting:{}};
      }
      _addToCBS("getContainerData_cb",query,cb);
      _execMethod("getContainerData",query);
    };
    /*
     *  打开设置数字的模态窗口
     *  options:{title: '编辑客服接待量',label:"最大接待量"}
     */
    p.openNumberInput=function(query,cb){
      _addToCBS("openNumberInput_cb",query,cb);
      _execMethod("openNumberInput",query);
    };
    /**
     * 打开公告编辑
     */
    p.openMailBox = function(query, cb) {
      _addToCBS("openMailBox_cb",query,cb);
      _execMethod("openMailBox",query);
    };
    let receiveMessage=function(event){
      let data=event.data||{};//必须含method,params属性
      let fromOrigin = event.origin || event.originalEvent.origin; 
      let fromWin=event.source;
      let bkfn=_W._MsgCBS[data.type||data.method];
      if(bkfn){
        bkfn(data.params||data.data);
        delete _W._MsgCBS[data.type||data.method];
        bkfn=null;
      }
    };
    window.addEventListener("message", receiveMessage, false);
    return p;
};

const iframeC=_iframeC({});
export {iframeC};
