import React from "react";

class Loader extends React.PureComponent{
    render(){
        return(
            <div class="ripple-loader">
                <div class="ball-scale-multiple">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Loader;