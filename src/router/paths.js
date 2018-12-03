import example from './example';
import project from '../pages/project/path';
import tipbu_6streams_path from '../pages/tipbu_6streams/path';
import RMS from '../pages/RMS/path';
const paths = [];

paths.push(...tipbu_6streams_path);
paths.push(...RMS);
paths.push(...project);
paths.push(...example);

export default paths;
