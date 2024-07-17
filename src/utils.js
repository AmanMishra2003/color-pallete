import chroma from 'chroma-js'
function generateColor(color){
    return chroma.scale(['#ffffff',color,'#000000']).mode('lch').colors(21)
}   

export {generateColor}