import React from 'react'

const Slider = ({style, children, contentLength,onTransitionEnd,onMouseMove,onMouseDown,onMouseUp,onTouchStart,onTouchMove,onTouchEnd}) => {

    const setContentLength = () =>{
        contentLength(children.length+2)
    }

    // Re-ordering slides
    const firstContent = children[0];
    const lastContent = children[children.length-1];
    const childrenLoop = [lastContent,...children,firstContent];
    
    return (
        <div className="slider"
        onTransitionEnd={onTransitionEnd} 

        onLoad={setContentLength} 
        style={{
            width:style.width,
            transform:style.transform,
            transition:style.transition
            }}>
            {childrenLoop && childrenLoop.map( (child,key) => {
                        return <div 
                        className="slide" 
                        style={{width:style.slideWidth}}
                        key={key}>
                            <child.type {...child.props} key={key} />
                        </div>
                    })} 
        </div>
    )
}

export default Slider;
