import example from './example';
import project from '../pages/project/path';
import tipbu_6streams_path from '../pages/tipbu_6streams/path';
import vision from '../pages/vision/router';
const paths = [];

paths.push(...tipbu_6streams_path);
paths.push(...vision);
paths.push(...project);
paths.push(...example);

export default paths;
