//1，一个楼梯有10层台阶，一次只能走1层台阶或2层台阶。请问有多少种走法？

//用动态规划来解决，假设只差最后一步走到第10层？这时分为第8层走2层到10层和第9层走1层到10层。这时走10层的问题就为分成了两种问题的解决？走到第9层的所有走法加上走第8层的所有走法。即P10=P8+P9;同理，P8 = P7+P6。

//依次类推 Pn = Pn-1+Pn-2; P1 = 1 P2 =2;

 function getWays(n){
        let a=1,b=2,result;
        if(n==1){
           result = 1;
        }else if(n==2){
           result = 2;
        }else if(n>2){
           for(let i=2;i<n;i++){
              result = a+b;
              a=b;
              b=result;
           }
        }
        return result;
    }
//2，背包问题，有N件物品和一个容量为W的背包。第i件物品的重量是w[i]，价值是v[i]。求解将哪些物品装入背包可使这些物品的重量总和不超过背包容量，且价值总和最大。

//采用动态规划来计算，假设剩最后一件物品j没有放，前面放的是最高价值的V[i]。如果放了，背包的价值为v[i-w[j]]+v[j]。背包的最大价格为MAX(V[i],v[i-w[j]]+v[j]);

function Knapsack(w,wt){ //w为背包的容量，wt为物品数组。
        let result = [];
        let len=wt.length
        let V = new Array(len);//V为二维数组V[i][j],i为第几个物品，j为背包容量。
        V[0] = [];
       for(let i = 1;i<=len;i++){
           V[i] = [];
          for(let j =1;j<=w;j++){
              if(j<wt[i-1].weight){//如果当前容量不能放这个物品
                  V[i][j] = V[i-1][j]||0;//因为如果放不下
              }else{
                  V[i-1][j] = V[i-1][j]||0;
                  V[i-1][j-wt[i-1].weight]=V[i-1][j-wt[i-1].weight]||0;
                  V[i][j] = Math.max(V[i-1][j],V[i-1][j-wt[i-1].weight] + wt[i-1].value)
                //   console.log();
              }
          }
       }
       for(let i=len,j=w;i>0;i--){
           if(V[i][j]>V[i-1][j]){//如果大于前一个，说明可以放入该物品。
               result[i-1] = 1;
               j= j - wt[i-1].weight;
           }else{
               result[i-1]=0;
           }
       }
       console.log(V[len][w]);
       return result;

    }
    var array = [new Goods(3,6),new Goods(4,5),new Goods(5,2),new Goods(5,5),new Goods(6,7),new Goods(4,5)];
   console.log(Knapsack(20,array));
//3，给定一个长度为N的数组，找出一个最长的单调自增子序列（不一定连续，但是顺序不能乱）。例如：给定一个长度为6的数组A{5， 6， 7， 1， 2， 8}，则其最长的单调递增子序列为{5，6，7，8}，长度为4.

//设长度为N的数组为{a0，a1, a2, ...an-1)，则假定以aj结尾的数组序列的最长递增子序列长度为L(j)，则L(j)={ max(L(i))+1, i<j且a[i]<a[j] }。也就是说，我们需要遍历在j之前的所有位置i(从0到j-1)，找出满足条件a[i]<a[j]的L(i)，求出max(L(i))+1即为L(j)的值。最后，我们遍历所有的L(j)（从0到N-1），找出最大值即为最大递增子序列。时间复杂度为O(N^2)。

  function list(arr){
      let longest = [];
      let result =[];
      let max=0;
      let len = arr.length;
      for(let i = 0;i<len;i++){
          for(let j =0;j<i;j++){
              longest[j] = longest[j]||1;
              longest[i] = longest[i]||1;
              if(arr[i]>arr[j]&&longest[i]<longest[j]+1){
                longest[i] = longest[j] + 1;
                // console.log(j);
              }
          }
      }
      
     longest.forEach((item,index)=>{
        console.log(item);
       if(item>max){
          result.push(arr[index]);
          max = item;
       }
     })
     return result;
   }
   let arr = [1, 4, 5, 6, 2, 3, 8];
   console.log(list(arr));
//4，图的最短路径

//采用邻接距阵来表示图。用V来表示从起始点到目标点的权值。在到目标点前一步时，判断Vj值是不是最小的。如果

//Vj>Vi + graph[i][j],那么Vj=Vi+graph[i][j]。循环所的有点找到最小的Vj。

function findShortestPath(graph,startIndex,max){
      let path = [],cost=[],V=[];
      let len = graph.length;
      for(let i=0;i<len;i++){
          if(i===startIndex){//如果i为出发点
            V[i] = true;
          } else{
              cost[i] = graph[startIndex][i];
              if(cost[i]<max){
                  path[i] = startIndex;
              }else{
                  path[i] = -1;
              }
              V[i] = false;
          }
      }
      for(let i = 1;i<len;i++){
          let minCost = max;
          let curNode = -1;
          for(let w =0;w< len;w++){
              if(!V[w]){
                  if(cost[w]<minCost){
                      minCost = cost[w];
                      curNode = w;
                  }
              }
          }
          if(curNode == -1){
              break;
          }
          V[curNode] = true;
          for(let i = 0 ;i<len;i++){
              if(!V[i]&&(graph[curNode][i]+cost[curNode]<cost[i]))
              {
                  cost[i] = graph[curNode][i] + cost[curNode];
                  path[i] = curNode
              }
          }
      }
      console.log(cost,path);
      
  }
  let max = 10000;
  let graph = [
    [max,max,10,max,30,100],
    [max,max,5,max,max,max],
    [max,max,max,50,max,max],
    [max,max,max,max,max,10],
    [max,max,max,20,max,60],
    [max,max,max,max,max,max]
];
findShortestPath(graph,0,max);
//5，硬币问题

//有n种硬币，面值分别为V1,V2,…,Vn, 每种有无限多。给定非负整数S，可以选用多少硬币，使得面值之和恰好为S，输出硬币数目的最小值和最大值。（1<=n<=100,0<=S<=10000,1<=Vi<=S）。

//完全背包，可以选择无限次某个物品，来达到某个（重量）。

//把S看做重量和，把硬币的面值看重量，把硬币个数当做是价值（也就是1）。

function coin(arr,value){
   let len = arr.length;
   let min=[0],max = [0];
   for(let i=1;i<value;i++){
       min[i] = 10000;
       max[i] = -10000;
   }
   for(let j =0;j<=len;j++){
       for(let i = arr[j];i<=value;i++){
            if(min[i-arr[j]]+1<min[i]){
                min[i] = min[i-arr[j]]+1;
            }
            if(max[i-arr[j]]+1>max[i]){
                max[i] = max[i-arr[j]]+1
            }
        
       }
   }
console.log(min,max);


}

let arr3 = [1,2,3,4,5,8,10];
coin(arr,20);
//6,求数组的最大子数组
//从数组最开始，由左到右记录到目前处理过的最大子数组，若已知A[1...j]的最大子数组，基于这个性质将扩展为A[1..j+1]的最大子数组：要么是A[1...j]的最大子数组，要么是A[i...j+1](1<i<j+1)。在已知A[1...j]的最大子数组的情况下，只需比较A[i...j+1]和A[1...j]的最大数组就行了。

function maxSubArray(arr){
  let maxArray = arr[0],count = arr[0],len = arr.length;
  for(let i = 1;i<len;i++){
    count = Math.max(count+arr[i],arr[i])//依次求出i为各个数值的最大值[i...j+1]，
    maxArray = Math.max(maxArray,count);//取[i...j+1]和[1...j]最大子串的大值。
  }
  return maxArray;
}
//如果用分治法先把数组分为 left到mid和mid到right。这时最大子数组分为三种情况，第一种在左边第二种在右边，第三种，在中间。所以先考虑在中间的最大值怎么求。然后比较左，中，右的最大值就可以了。

function maxSubArray(arr,left,right){
  if(right === left){
    return[left,right,arr[left]];
  }
  let mid = Math.floor((left+right)/2);
  let [leftLow,leftHigh,leftSum] = maxSubArray(arr,left,mid);
  let [rightLow,rightHigh,rightSum] = maxSubArray(arr,mid+1,right);
  let [crossLow,crossHigh,crossSum] = findCrossSubArray(arr,left,mid,right);
  if(leftSum>=rightSum&&leftSum>=crossSum){
    console.log([leftLow,leftHigh,leftSum]);
    return [leftLow,leftHigh,leftSum]
  }else if(rightSum>=leftSum&&rightSum>=crossSum){
    return [rightLow,rightHigh,rightSum]
  }else{
    return [crossLow,crossHigh,crossSum]
  }


}
function findCrossSubArray(arr,left,mid,right){
  let leftSum = -9999,rightSum= -9999,sum =0,maxleft,maxright;
  for (let i = mid;i>=left;i--){
    sum += arr[i];
    if(sum>leftSum){
      leftSum = sum;
      maxleft = i;
    }
  }
  sum = 0;
  for (let j = mid+1;j<=right;j++){
    sum += arr[j];
    if(sum>rightSum){
      rightSum = sum;
      maxright = j;
    }
  }
  return [maxleft,maxright,leftSum+rightSum];
}
console.log(maxSubArray([2,3,4,5,-20,12,10],0,6));
