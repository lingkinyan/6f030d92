const callGrouping = (callArray) => {
  let leftPointer = 0;
  let rightPointer = 0;
  let groupedArray = [];

  function categorizeCall(lp, rp) {
    const temp = callArray.slice(lp, rp);
    return temp.reduce((acc, curr) => {
      const { duration, id, created_at, ...usefulInfo } = curr;
      const hash = JSON.stringify(usefulInfo);
      if (acc?.[hash]) {
        acc[hash].count = acc[hash].count || 1;
        acc[hash].count += 1;
        acc[hash].duration += curr.duration;
      } else {
        acc[hash] = curr;
      }
      return acc;
    }, {});
  }

  while (rightPointer < callArray.length) {
    if (callArray[leftPointer].createdAt === callArray[rightPointer].createdAt) rightPointer++;
    else {
      // calculation here
      groupedArray = groupedArray.concat(Object.values(categorizeCall(leftPointer, rightPointer)));
      // at the end shift the left pointer
      leftPointer = rightPointer;
    }
  }

  if (leftPointer !== rightPointer) {
    return groupedArray.concat(Object.values(categorizeCall(leftPointer, rightPointer)));
  }
  return groupedArray
};

export default callGrouping;
