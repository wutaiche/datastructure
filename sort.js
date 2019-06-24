 function kmpGetStrPartMatchValue(str){
    let prefix=[];
    let suffix=[];
    let partMatch=[];
    for (let i=0,len=str.length;i<len;i++){
        let newStr = str.slice(0,i+1);
        if(newStr.length===1){
            partMatch[i] = 0;
        } else {
            for(let k =0;k<i;k++){
                prefix[k] =newStr.slice(0,k+1);
                suffix[k] = newStr.slice(-k-1);
                if(prefix[k] == suffix[k]){
                    partMatch[i] = prefix[k].length;
                }
            }
            if(!partMatch[i]){
                partMatch[i] = 0;
            }
        }
    }
    return partMatch;
}
function KMP(sourceStr,searchStr){
    let part = kmpGetStrPartMatchValue(searchStr);
    let soulen = sourceStr.length;
    let sealen = searchStr.length;
    let result;
    for(let i=0;i<soulen;i++){
        for(let j=0;j<sealen;j++){
            if(searchStr.charAt(j)===sourceStr.charAt(i)){
                if(j===sealen-1){
                    result = i-j;
                    break;
                }else{
                    i++;
                }
            }else{
                if(j>1&&part[j-1]>0){
                    j = part[j-1] - 1;
                }else{
                    break;
                }
                
            }
        }
        if(result||result===0){
            break
        }
    }
    if(result||result===0){
        return result
    }else{
        return -1;
    }
}

var s ='aaaaaaaaaaaabacca';
var t ='aacbc';
console.log(s.indexOf(t),KMP(s,t));


function sort(){
  let array =[1,4,2,7,8,9,12,34,13,12,17];
  let temp = new Array(array.length);
//    mergeSort(array,0,array.length-1,temp);
//    quickSort(array,0,array.length-1);
//    heapSort(array);
//    shellSort(array);
 //   bubbleSort(array);
  //  selectSort(array);
  //  insertSort(array);
//    console.log(array);
}
sort();
//归并排序
function mergeSort(arr,left,right,temp){
   if(left>=right){
       return;
   }
   let mid =Math.floor((right+left)/2); //注意JS除法一定要取整。
   mergeSort(arr,left,mid,temp);
   mergeSort(arr,mid+1,right,temp);
   merge(arr,left,mid,right,temp);
   
}

function merge(arr,left,mid,right,temp){
    let i,m,j;
   i =left;
   m = mid+1;
   j = 0; 
   while(i<=mid&&m<=right){
       if(arr[i]<=arr[m]){
        temp[j++] = arr[i++];
       }else{
        temp[j++] = arr[m++]
       }
   }
   while(i<=mid){
       temp[j++] = arr[i++]
   }
   while(m<=right){
       temp[j++] = arr[m++];
   }
   j=0;
   while(left<=right){
       arr[left++] = temp[j++]
   }

};
//快速排序
function quickSort(arr,left,right) {
    if(left>=right){
       return
    }
    let i,m,temp;
    dealPivot(arr,  left,  right);
    i = left;
    m = right-1;
    temp = arr[right-1];
    while(i<m){
        while(arr[++i]<= temp&&i<m){
        }
        while(arr[--m]>=temp&&i<m){
            
        }
        if(i<m){
           swap(arr,i,m);
        }
    }
    console.log(i);
    if(i<right-1){
       swap(arr,i,right-1);
    }
    quickSort(arr,left,i-1);
    quickSort(arr,i+1,right);
    
};
//三数取中法
function dealPivot(arr,  left,  right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[left] > arr[mid]) {
        swap(arr,left,mid);
    }
    if (arr[left] > arr[right]) {
        swap(arr, left,right);
    }
    if (arr[right] < arr[mid]) {
        swap(arr,mid,right);
    }
    if(mid!==right-1){
        swap(arr,mid,right-1);
    }
}

//交换数组的值
function swap(arr,left,right){ //数组交换一定要把数组传过来。因为数组是引用，只传两个值 没有效果。
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
//   arr[left] = arr[left] + arr[right];
//   arr[right] = arr[left] - arr[right];
//   arr[left] = arr[left] - arr[right]; 如果left=right就会出问题。
  
}
//堆排序
function heapSort(arr){
   let i,j,len;
   len = arr.length;
   i = Math.floor(arr.length/2)-1;
   while(i>=0){
       adjustHeap(arr,i,len-1);
       i--;
   }
   
   for (j=len-1;j>0;j--){
       swap(arr,0,j);
       adjustHeap(arr,0,j-1);
   }

}
function adjustHeap(arr,i,len){
    let k,temp;
    temp = arr[i];
    for(k=i*2+1;k<=len;k=k*2+1){
        if(k+1<=len&&arr[k+1]>arr[k]){
            k++;
        }
        if(arr[k]>temp){
            arr[i] = arr[k];
            i=k;
        }else{
            break;
        }
    }
    arr[i] = temp;

}

//希尔排序
function shellSort(arr){
    let a,len;
    len = arr.length;
    let gap = Math.floor(len/2);
    for(gap;gap>0;gap=Math.floor(gap/2) ){
        for(let i =gap;i<len;i++){
            let j = i;
            while (j-gap>0){
                if(arr[j]<arr[j-gap]){
                   swap(arr,j,j-gap)
                }
                j-=gap;
            }
        }
    }
}

//冒泡排序
function bubbleSort(arr){
    let len = arr.length;
    for(let i =0; i<len;i++){
        for(let j=len;j>i;j--){
           if(arr[j]<arr[j-1]){
               swap(arr,j,j-1);
           }
        }
    }
}
//选择排序
function selectSort(arr){
    
    let len = arr.length;
    for (let i =0;i<len;i++){
        let min = arr[i];
        let index = i;
        for(let j=i;j<len;j++){
           if(arr[j]<min){
             min = arr[j];
             index = j;
           }

        }
        if(index!=i){
             swap(arr,i,index);
        }
    }
}
//插入排序
function insertSort(arr){
  let i,j, temp,len;
  len = arr.length;
  for(i=1;i<len;i++){
    temp = arr[i];
    for(j=i-1;j>=0;j--){
      if(arr[j]>temp){
        arr[j+1] = arr[j];
      }else{
        break;
      }
    }
    if(j+1 !== i){
    arr[j+1] = temp;
    }
  }
}
//下面是JS自带sort一部分代码，在数组长度小于10用的插入排序，大于10用的快速排序。
//具体参考https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js
function arraySort(array, length, comparefn){
    if(!comparefn){
        let comparefn = function (x, y) {
            if (x === y) return 0;
            x = TO_STRING(x); //如果没有compare函数自动转成字符串，这就是sort是字符串排序的原因。
            y = TO_STRING(y);
            if (x == y) return 0;
            else return x < y ? -1 : 1;
         };
    }
    let insertionSort = function insertionSort(a,from,to){
        for (var i = from + 1; i < to; i++) {
            var element = a[i];
                for (var j = i - 1; j >= from; j--) {
                    var tmp = a[j];
                    var order = comparefn(tmp, element);
                    if (order > 0) { //只需要大于0就要交换值，所以compare函数可以简定成return a-b;
                                        
                        a[j + 1] = tmp;
                    } else {
                        break;
                    }
                }
            a[j + 1] = element;
        }   
    }
}
