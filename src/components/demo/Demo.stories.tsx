import demoInput from './demoInput'

export default {
    title:'App/input',
    component:demoInput
}

export const Primary={
    args:{
        size:'long',
        placeholder:'Primary',
        border:'sharp',
        type:'text'
    }
}

export const Secondary={
    args:{
        size:'small',
        placeholder:'Secondary',
        border:'round',
        type:'text'
    }
}