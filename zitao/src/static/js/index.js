(() => {
  let loop
  const TOTAL = 4
  const SLIDE_WIDTH = 100  // 单位%
  const WRAPPER = document.getElementsByClassName('carousel-wrapper')[0]
  const PAGINATIONS = document.getElementsByClassName('pagination')

  window.onload = () => {
    // 初始化
    WRAPPER.style.left = `-${SLIDE_WIDTH}%`
    PAGINATIONS[0].style.backgroundColor = '#2ccc90'

    startLoop()
    clickBus()
  }

  // 开始循环播放
  const startLoop = () => {
    const MOVE_SPACE = 1
    let targetSpace = 1 + MOVE_SPACE

    clearInterval(loop)

    loop = setInterval(() => {
      targetSpace = getCurrentSpace() + MOVE_SPACE
      setSlide(targetSpace)
      setPagination(targetSpace)
    },5000);
  }

  const getCurrentSpace = () => {
    let currentSpace = 1
    let currentLeft = WRAPPER.style.left

    if (currentLeft) {
      currentSpace = parseInt(currentLeft.replace(/%/g, '') / -SLIDE_WIDTH)
    } else {
      WRAPPER.style.left = `-${SLIDE_WIDTH}%`
    }
    return currentSpace
  }

  const setSlide = (targetSpace) => {
    WRAPPER.style.transition = '1s'
    setTimeout(() => {
      document.getElementsByClassName('box-4')[0].style.display = 'block'
    }, 500)
    if (targetSpace > 0 && targetSpace <= TOTAL) {
      WRAPPER.style.left = `-${targetSpace * SLIDE_WIDTH}%`
      if(targetSpace > 2) {
        setTimeout(() => {
          document.getElementsByClassName('box-4')[0].style.display = 'none'
        }, 500)
      }
    } else if (targetSpace > TOTAL) {  // 最后 -> 最前
      WRAPPER.style.left = `-${targetSpace * SLIDE_WIDTH}%`
      setTimeout(() => {
        // 清除切换特效
        WRAPPER.style.transition = '0s';
        WRAPPER.style.left = `-${SLIDE_WIDTH}%`
      }, 1000);
    } else {  // 最前 -> 最后
      WRAPPER.style.left = '0%'
      setTimeout(() => {
        WRAPPER.style.transition = '0s';
        WRAPPER.style.left = `-${TOTAL * SLIDE_WIDTH}%`
      }, 1000);
    }
  }

  const setPagination = (targetSpace) => {
    if(targetSpace > TOTAL) targetSpace = 1
    if(targetSpace < 1) targetSpace = TOTAL

    for (let i = 0; i < TOTAL; i++) {
      PAGINATIONS[i].style.backgroundColor = '#fff'
    }

    PAGINATIONS[Math.round(targetSpace - 1)].style.backgroundColor = '#2ccc90'
  }


  // 绑定点击事件
  const clickBus = () => {
    let targetSpace

    // 绑定向前点击事件
    document.getElementsByClassName('slide-prev')[0].onclick = () => {
      const MOVE_SPACE = -1
      targetSpace = getCurrentSpace() + MOVE_SPACE
      handleClick(targetSpace)
    }

    // 绑定向后点击事件
    document.getElementsByClassName('slide-next')[0].onclick = () => {
      const MOVE_SPACE = 1
      targetSpace = getCurrentSpace() + MOVE_SPACE
      handleClick(targetSpace)
    }

    // 绑定页签点击事件
    for (let i = 0; i < 4; i++) {
      PAGINATIONS[i].onclick = () => {
        targetSpace = i + 1
        WRAPPER.style.left = `-${targetSpace * SLIDE_WIDTH}vm`
        handleClick(targetSpace)
      }
    }
  }

  // 手动点击后，暂停轮播， 10秒后再开始播放
  const handleClick = (targetSpace) => {
    setSlide(targetSpace)
    setPagination(targetSpace)
    clearInterval(loop)
    setTimeout('startLoop()', 10000);
  }
})()
