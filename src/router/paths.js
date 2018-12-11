// import example from './example';
// import project from '../pages/project/path';
import tipbu_6streams_path from '../pages/tipbu_6streams/path';
import vision from '../pages/vision/router';
import RMS from '../pages/RMS/path';
// import vision3 from '../pages/vision3/router';
import genius from '../pages/genius/router';

const paths = [];

paths.push(...tipbu_6streams_path);
paths.push(...RMS);
paths.push(...genius);
paths.push(...vision);
// paths.push(...vision3);
// paths.push(...project);
// paths.push(...example);

export default paths;
