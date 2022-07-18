import { Dimensions } from 'react-native';
import {useState,useEffect} from 'react'
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

const scale = size => {
    'worklet';

    return (width / guidelineBaseWidth) * size;
};

const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};
export { scale, verticalScale, moderateScale, width, height,useDebounce };
