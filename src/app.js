import React, {useState,useEffect} from 'react'
import Slider from './slider'
import './app.scss'

const app = () => {

    const [sliderWidth,setSliderWidth] = useState(null);
    const [slideWidth,setSlideWidth] = useState(null);
    const [sliderTransform,setsliderTransform] = useState(null);
    const [sliderTransition,setsliderTransition] = useState(null);
    const [count, setCount] = useState(1);
    const [numberOfContents,setNumberOfContents] = useState(null);
    var timer = null;


    const contentLength = (number) => {
        setNumberOfContents(number);
    }


    const handleWindow = () => {
        setSliderWidth(window.innerWidth * numberOfContents);
        setSlideWidth(window.innerWidth);
    }

    window.addEventListener("resize",handleWindow);
    window.addEventListener("load",handleWindow);

  

    const moveSlide = () => {
        setsliderTransform('translateX('+(-window.innerWidth*count)+'px)');
    }


    useEffect(() => {
        moveSlide();
    },[count]);

    const transitionEnd = () => {
        if(count === numberOfContents-1){
            setsliderTransition("none");
            setCount(1);
            setsliderTransform('translateX('+(-slideWidth*count)+'px)');  
        }
        if(count === 0){
            setsliderTransition("none");
            setCount(numberOfContents-2);
            setsliderTransform('translateX('+(-slideWidth*count)+'px)');
        }
    }

    const prevSlide = () => {
        setsliderTransition('transform 1s ease-in-out');
        if(count>0){
            setCount(count-1);
        }else {
            setCount(numberOfContents-2);
        }
    }

    const nextSlide = () => { 
        setsliderTransition('transform 1s ease-in-out');
        if(count<numberOfContents-1){
            setCount(count+1);
        } else {
            setCount(1);
        }
    }



    return (
        <div className="slider-container">
            <Slider 
            onTransitionEnd={transitionEnd}

            style={{
                width:sliderWidth,
                transform:sliderTransform,
                transition:sliderTransition,
                slideWidth:slideWidth
                }}
            contentLength = {contentLength}    
            >
                <img src={require(`./images/1.jpg`)} />
                <h2 style={{textAlign:'center'}}> This is Text element :) </h2>
                <img src={require(`./images/2.jpg`)} />
                <img src={require(`./images/3.jpg`)} />
                <h2> This one also text element </h2>
                <img src={require(`./images/4.jpg`)} />
            </Slider>

            <div className="prev" onTouchStart={prevSlide} onClick={prevSlide}>
                Prev
            </div>
            <div className="next" onTouchStart={nextSlide} onClick={nextSlide}>
                Next
            </div>
            <div className="dots">
            {Array(numberOfContents).fill(null).map((content,key) => {
                if(key>0 && key < numberOfContents-1){
                return <input 
                type="radio" 
                id={key} 
                onChange={() => setCount(key)} 
                name="content" 
                key={key} 
                checked={key === count ? true:false}/>
                }
            })}
            </div>
        </div>
    )
}

export default app;