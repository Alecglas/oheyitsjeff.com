
  let width;
  let height;
  let shouldCreate = [true,true,false,false,false];
  let shouldMove = true;
  let svg;
      document.addEventListener("DOMContentLoaded", function(){
          width = window.innerWidth;
          height = window.innerHeight;
          console.log(height);
          svg = d3.select("#vis").append("svg")
            .attr("width", Math.ceil(width/10)*10)
            .attr("height", Math.ceil(height/10)*10);
          createLotus(svg);
          //createSquare(svg);
          createCircle(svg);
          //createRect(svg);
          //createPrism(svg);
          document.addEventListener('keydown', logKey);
          const buttons = document.getElementsByTagName('button');
          buttons[1].classList.add('buttonActive');
          buttons[2].classList.add('buttonActive');

      });
  function changePattern(index, shape){
    shouldCreate[index] = !shouldCreate[index];
    const buttons = document.getElementsByTagName('button');
    
    if(!shouldCreate[index]){
      buttons[index+1].classList.remove('buttonActive');
      const currentShape = document.getElementsByClassName(shape);
      let lengthShape = currentShape.length -1;
       while( lengthShape >= 0){
        currentShape[lengthShape].remove();
        lengthShape--;
      }
    }else{
      buttons[index+1].classList.add('buttonActive');
      if(shape === 'lotus'){
        createLotus(svg);
      }
      if(shape === 'square'){
        createSquare(svg);
      }
      if(shape === 'circle'){
        createCircle(svg);
      }
      if(shape === 'rect'){
        createRect(svg);
      }
      if(shape === 'prism'){
        createPrism(svg);
      }
    }
  }
  function logKey(e){
    if(e.code === "KeyP"){
      shouldMove = !shouldMove;
    }
  }
  function goTo(page){
    window.location.href = page;
  }
  function createLotus(svg){
  const z = 50,
        x = width/ z,
        y = height / z,
        ogLineSize = ".45vh",
        scaleSizeChange = 1;
  let hue = 0,
      hueBody = 0,
      vhTen = height*.05,
      cordXY = [45,52,47,35],
      signCheck = [1,1,1,1],
      newString,
      lineSet = 0,
      cSetPercent = [.5, .5,.5,.5,.5, .5,.5, .5,.5, .5, .5,.5,.5, .5,.5,.5,.5, .5],
      totalPercentChange = 0,
      counter = 1,
      opacP = .2,
      lotusScale = 4;
    
    while(counter<70){
        svg.selectAll(".lotus")
        .data(d3.range(counter))
        .enter().append("polyline")
        .style("stroke", "white")
        .style("stroke-width", ogLineSize)
        .attr("points", getPercentCoord(cSetPercent)) 
        .attr("fill","none")
        .attr("class","lotus")
        .attr("stroke-linecap", "round") 
        .on("mouseover", mouseover);
        counter++;
    }
  function getPercentCoord(points){

  let count8 = 0,
    newStringTemp = "",
    stringNew,
    currentSign = [1,0];
    while(count8 < 17){
      //1
      if(count8 == 0){
        currentSign[0] = 1;
        currentSign[1] = 0;
      }
      //2
      //Crimp1 
      if(count8 == 2){
        currentSign[0] = lotusScale;
        currentSign[1] = lotusScale;
      }
      //3
      if(count8 == 4){
        currentSign[0] = 0;
        currentSign[1] = 1;
      }
      //4
      //crimp2
      if(count8 == 6){
        currentSign[0] = -1*lotusScale;
        currentSign[1] = lotusScale;
      }
      //5
      if(count8 == 8){
        currentSign[0] = -1;
        currentSign[1] = 0;
      }
      //6
      //crimp3
      if(count8 == 10){
        currentSign[0] = -1*lotusScale;
        currentSign[1] = -1*lotusScale;
      }
      //7
      if(count8 == 12){
        currentSign[0] = 0;
        currentSign[1] = -1;
      }
      //8
      //crimp4
      if(count8 == 14){
        currentSign[0] = lotusScale;
        currentSign[1] = -1*lotusScale;
      }
      //8
      if(count8 == 16){
        currentSign[0] = 1;
        currentSign[1] = 0;
      }

      points[count8] = (points[count8] * x*z) - (currentSign[0]*totalPercentChange);
      points[count8+1] = (points[count8+1] * y*z) - (currentSign[1]*totalPercentChange);
      stringNew = points[count8].toString();
      newStringTemp = newStringTemp + stringNew + ",";   
      stringNew = points[count8+1].toString();

      if(count8 != 16){
        newStringTemp = newStringTemp + stringNew + ",";
      }
      else{
        newStringTemp = newStringTemp + stringNew;
      }
      points[count8] = points[count8]/(x*z);
      points[count8+1] = points[count8+1]/(y*z);
      count8 = count8 + 2;
    }
    if(counter == 1){
      totalPercentChange = totalPercentChange + 17;
    }

    totalPercentChange= totalPercentChange ;
    return newStringTemp; 
  }
  function mouseover(i) {
    if(!shouldMove){return;} 
      this.parentNode.appendChild(this);
      d3.select(this)
          .style("stroke", "white")
          .style("stroke-width",ogLineSize)
          .style("fill-opacity", opacP)

      .transition()
        .duration(300)
          .style("stroke-width","3vh")
          .style("stroke", function(i) {
            if(hue != 360){
              hue = hue + 1.3; 
            }else{
              hue = 0;
            }
            
            return d3.hsl(hue, 1,.60); 
            
            })
      .transition()
        .duration(300)
          .style("stroke-width", "1" + ogLineSize)
  
    }
  }
  function createSquare(svg){
    const z = 50,
          x = width / z,
          y = height / z,
          ogLineSize = ".5vh",
          scaleSizeChange = 1;
    let hue = 0,
          hueBody = 0,
          vhTen = height*.05,
          cordXY = [45,52,47,35],
          signCheck = [1,1,1,1],
          newString,
          lineSet = 0,
          cSetPercent = [.5, .5,.5, .5,.5, .5, .5, .5,.5, .5],
          totalPercentChange = 0,
          counter = 1,
          opacP = .2;
        
        while(counter<80){
        svg.selectAll(".square")
          .data(d3.range(counter))
          .enter().append("polyline")
          .style("stroke", "white")
          .style("stroke-width", ogLineSize)
          .attr("points", getPercentCoord(cSetPercent)) 
          .attr("fill","none")
          .attr("class","square")
          .attr("stroke-linecap", "square") 
          .on("mouseover", mouseover);
          counter++;
        }
      function getPercentCoord(points){
        
        let count8 = 0,
            newStringTemp = "",
            stringNew, 
            currentSign = [1,0];
        while(count8 < 9){
          if(count8 == 0){
            currentSign[0] = 1;
            currentSign[1] = 0;
          }
          if(count8 == 2){
            currentSign[0] = 0;
            currentSign[1] = 1;
          }
          if(count8 == 4){
            currentSign[0] = -1;
            currentSign[1] = 0;
          }
          if(count8 == 6){
            currentSign[0] = 0;
            currentSign[1] = -1;
          }
          if(count8 == 8){
            currentSign[0] = 1;
            currentSign[1] = 0;
          }
          points[count8] = (points[count8] * x*z) - (currentSign[0]*totalPercentChange);
          points[count8+1] = (points[count8+1] * y*z) - (currentSign[1]*totalPercentChange);
          stringNew = points[count8].toString();
          newStringTemp = newStringTemp + stringNew + ",";   
          stringNew = points[count8+1].toString();
          if(count8 != 8){
            newStringTemp = newStringTemp + stringNew + ",";
          }
          else{
            newStringTemp = newStringTemp + stringNew;
          }
          points[count8] = points[count8]/(x*z);
        points[count8+1] = points[count8+1]/(y*z);
          count8 = count8 + 2;
        }
        if(counter == 1){
          totalPercentChange = totalPercentChange + 20;
        }
        totalPercentChange= totalPercentChange ;
        return newStringTemp; 
      }
      function mouseover(i) {
        if(!shouldMove){return;} 
        this.parentNode.appendChild(this);
        d3.select(this)
            .style("stroke", "white")
            .style("stroke-width",ogLineSize)
            .style("fill-opacity", opacP)
         .transition()
           .duration(300)
            .style("stroke-width","3vh")
            .style("stroke", function(i) {
              if(hue != 360){
                hue++; 
              }else{
                hue = 0;
              }
                return d3.hsl(hue, 1,.60); 
              })
          .transition()
           .duration(300)
            .style("stroke-width", "1" + ogLineSize)
      }
    }
  function createRect(svg){
      const z = 61;
     let x = width / z,
      y = height / z,
      newW = width,
      sizeScale = 30,
      baseSizeSquare = ".6vh";
let hue = 0,
      hueBody = 0,
      vhTen = height*.05,
      sizeH = 10,
      sizeW = 10,
      angle = 0,
      newSize = 10;
let size = 10;  
    svg.selectAll(".rect")
      .data(d3.range(x * y))
      .enter().append("rect")
      .attr("width",sizeIncreaseW)
      .attr("height",sizeIncreaseH)
      .attr("x", newSquares)
      .attr("y",  newSquaresHeight)
      .attr("stroke","white")
      .attr("class","rect")
      .attr("stroke-width",baseSizeSquare)
      .attr("fill","none")
      .on("mouseover", mouseover);
      
      function toDegrees(rad) {
        return rad * (180/Math.PI);
    }
    function newSquares(i){
        size = size + sizeScale;
        return newW/2 - size/2;
    }   
    function newSquaresHeight(i){
        newSize = newSize + sizeScale;
        return newSize/2;
    } 
    function sizeIncreaseH(i){
           sizeH = sizeH + sizeScale;
           return sizeH;
           
    }
    function sizeIncreaseW(i){
           sizeW = sizeW + sizeScale;
           return sizeW;
    }
      function translateX(i){
              return Math.floor((i % x) * z)
      }
      function translateY(i){
            return (Math.floor(i / x) * z)
      }
    
      function translate(i) {
        return "translate("+(i % x) * z+","+Math.floor(i / x) * z+")";
      }
      
      function mouseover(i) {
        if(!shouldMove){return;} 
        this.parentNode.appendChild(this);
    
        d3.select(this)
            .style("stroke-width"," 2vh")
            .style("stroke", "white")
            .style("fill-opacity", .45)
            .style("z-index","100")
            .style("stroke", function(i) {
              if(hue != 360){
                hue = hue + .8; 
              }else{
                hue = 0;
              }
              
              return d3.hsl(hue, 1,.60); 
              
              })
    
         .transition()
           .duration(1000)
            .style("stroke-width","2vh")
            .style("stroke","black")
        .transition()
           .duration(200)
            .style("stroke-width",baseSizeSquare)
            //.style("stroke","white")
            .transition()
              .duration(1000)
              .style("stroke-width",baseSizeSquare)
              .style("stroke","white")
      }
  }
  function createPrism(svg){
    let h = height,
    w = width,
    z = 90,
    x = w / z,
    y = h / z;
let hue = 0,
    hueBody = 0,
    vhTen = h*.05,
    centerFinderH = 3,
    centerFinderW = 3,
    sizer = 3,
    centerLocation = 2,
    size = 10; 
           
 svg.selectAll(".prism")
    .data(d3.range(x*y))
    .enter().append("circle")
    .attr("cx", getCenterWidth)
    .attr("cy", getCenterHeight)
    .attr("r", sizeIncrease)
    .attr("fill","none")
    .attr("stroke","black")
    .attr("class","prism")
    .attr("stroke-width",".5vh")
    .on("mouseover", mouseover);

function getCenterHeight(i){
  if(centerFinderH%3 == 0){
      centerLocation = 2.09;
  }
   if(centerFinderH%3 == 1){
     centerLocation = 2.09;
  }
   if(centerFinderH%3 == 2){
     centerLocation = 1.99;
  }
  centerFinderH++;
  return h/centerLocation;
}
function getCenterWidth(i){

  if(centerFinderW%3 == 0){
      centerLocation = 1.98;
  }
   if(centerFinderW%3 == 1){
     centerLocation = 2.02;
  }
   if(centerFinderW%3 == 2){
     centerLocation = 2;
  }
  centerFinderW++;
  return w/centerLocation;
}

function sizeIncrease(i){
  if(sizer%3 == 0){
      size = size + 25;
  }
  sizer++;
  return size;
}
function translateX(i){
        return Math.floor((i % x) * z)
}
function translateY(i){
      return (Math.floor(i / x) * z)
}

function translate(i) {
  return "translate("+(i % x) * z+","+Math.floor(i / x) * z+")";
}

function mouseover(i) {
  if(!shouldMove){return;} 
  this.parentNode.appendChild(this);
  d3.select(this)
      .style("stroke-width"," .3vh")
      .style("stroke", "white")
       .style("fill-opacity", .45)
      .style("stroke", function(i) {
        if(hue != 360){
          hue++; 
        }else{
          hue = 0;
        }
        
        return d3.hsl(hue, 1,.60); 
        
        })

   .transition()
     .duration(300)
      .style("stroke-width"," 10px")
  .transition()
     .duration(300)
      .style("stroke-width"," 20px")
    
    }
  }
  function createCircle(svg){
    const z = 72,
    x = width / z,
    y = height / z;
let hue = 0,
    hueBody = 0,
    vhTen = height*.05;
let size = 10;  
 svg.selectAll(".circle")
    .data(d3.range(x * y))
    .enter().append("circle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r",sizeIncrease)
    .attr("fill","none")
    .attr("stroke","white")
    .attr("class","circle")
    .style("stroke-width"," 2px")

    .on("mouseover", mouseover);
    
function sizeIncrease(i){
     size = size + 5;
     return size;
}
function translateX(i){
        return Math.floor((i % x) * z)
}
function translateY(i){
      return (Math.floor(i / x) * z)
}

function translate(i) {
  return "translate("+(i % x) * z+","+Math.floor(i / x) * z+")";
}

function mouseover(i) {
  if(!shouldMove){return;} 
  this.parentNode.appendChild(this);

  d3.select(this)
    
      
     
      .style("stroke-width"," .3vh")
      .style("stroke", "white")
       .style("fill-opacity", .45)
      .style("stroke", function(i) {
        if(hue != 360){
          hue++; 
        }else{
          hue = 0;
        }
        
        return d3.hsl(hue, 1,.60); 
        
        })

   .transition()
     .duration(300)
      .style("stroke-width"," 10px")
  .transition()
     .duration(300)
      .style("stroke-width"," 15px")
  }
}
    

