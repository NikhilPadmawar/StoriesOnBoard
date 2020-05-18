const nodes = [
    {
      value: "ParentOne",
      label: "ParentOne",
      color:"red",
      children: [
        {
          value: "ChildOne",
          label: "ChildOne"
        },
        {
          value: "ChildTwo",
          label: "ChildTwo",
          color:"blue"
        }
      ]
    },
    {
      value: "ParentTwo",
      label: "ParentTwo",
      children: [
        {
          value: "P-ChildOne",
          label: "ChildOne"
        },
        {
          value: "P-ChildTwo",
          label: "ChildTwo",
          color:"green"
        }
      ]
    }
  ];
  
  
  function deleteEle(nodes,value){
    
   
      nodes.map((ele,index)=>{
        if(ele.value == value){
          nodes.splice(index,1);
        }
        else{
             if(ele.children){
                deleteEle(ele.children,value)
        }
        }
     
      })
  }
  
  deleteEle(nodes,"P-ChildOne");
  
  console.log(nodes);