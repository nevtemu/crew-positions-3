javascript:(async function(){
    function transformFormat(str){let fltNumber=str.split("_")[1];let temp=str.split("_")[2].split("-",3);temp[1]=(parseInt(temp[1])+1).toString();temp[2]=(parseInt(temp[2])+2000).toString();temp.forEach((n,i)=>temp[i]=n.padStart(2,"0"));let date=temp.join("/");return fltNumber+"_"+date}
    function convertDate(stringDate){[day,month,year]=stringDate.split(" ",1)[0].split("/");let rest=stringDate.split(" ")[1];return [parseInt(month),day,year].join("/")+" "+rest}
    
    let userStaffNumber=localStorage.getItem("CurrentStaffNo"),
        crewDataKey=Object.keys(localStorage).filter(k=>k.startsWith("Crew_")&&!k.endsWith("TimeOut")),
        rosterKey=Object.keys(localStorage).filter(k=>k.startsWith("Roster_"+userStaffNumber)&&!k.endsWith("TimeOut")&&!k.endsWith("Destination")),
        flightDataKey=Object.keys(localStorage).filter(m=>m.startsWith("Position_")&&!m.endsWith("TimeOut")),
        dataToGo={},roster=[];
    
    rosterKey.forEach(item=>roster.push(JSON.parse(localStorage.getItem(item))));
    roster.forEach(item=>item.StaffRosters[0].RosterData.CrewRosterResonse.Trips.Trp.forEach(subitem=>dataToGo[subitem.TripNo+"_"+subitem.StartDate.split(" ",1)]={}));
    crewDataKey.forEach(item=>dataToGo[transformFormat(item)].crewData=JSON.parse(localStorage.getItem(item)));
    flightDataKey.forEach(item=>dataToGo[item.split(" ",1)[0].split("_").slice(-2).join("_")].flightData=JSON.parse(localStorage.getItem(item)));
    
    roster.forEach(item=>item.StaffRosters[0].RosterData.CrewRosterResonse.Trips.Trp.forEach(subitem=>{
      let key=subitem.TripNo+"_"+subitem.StartDate.split(" ",1)[0];
      dataToGo[key].shortInfo={};
      dataToGo[key].shortInfo.sectors=subitem.Dty.length;
      dataToGo[key].shortInfo.flightNumber=subitem.Dty[0].Flt[0].FltNo;
      dataToGo[key].shortInfo.flightDate=new Date(convertDate(subitem.Dty[0].Flt[0].DepDate));
      let flightLegs=["DXB"],layovers=[],durations=[],sectorsPerDuty=[];
      subitem.Dty.forEach(duty=>{
        sectorsPerDuty.push(duty.Flt.length);
        duty.Flt.forEach(flightLeg=>{
          if(flightLeg.ArrStn!=="DXB"){flightLegs.push(flightLeg.ArrStn);layovers.push(flightLeg.LayOverTime)}
          durations.push(flightLeg.Duration)
        })
      });
      dataToGo[key].shortInfo.flightLegs=flightLegs;
      dataToGo[key].shortInfo.layovers=layovers;
      dataToGo[key].shortInfo.durations=durations;
      dataToGo[key].shortInfo.sectorsPerDuty=sectorsPerDuty;
      dataToGo[key].shortInfo.staff=userStaffNumber;
    }));
    
    dataToGo=Object.entries(dataToGo).sort(([,a],[,b])=>a.shortInfo.flightDate-b.shortInfo.flightDate).reduce((r,[k,v])=>({...r,[k]:v}),{});
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(dataToGo,null,2));
      console.log("Data copied!");
      window.open("http://127.0.0.1:5501/index.html","_blank");
    } catch(err){
      console.error("Failed to copy:",err);
      prompt("Copy manually:",JSON.stringify(dataToGo,null,2));
    }
  })();
  