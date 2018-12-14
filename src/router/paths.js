import defaultRouter from './default';
// import example from './example';
// import project from '../pages/project/path';
import tipbu_6streams_path from '../pages/tipbu_6streams/path';
import vision from '../pages/vision/router';
import RMS from '../pages/RMS/path';
import EnergyManagement from '../pages/EnergyManagement/path';
import WarehouseManagement from '../pages/WarehouseManagement/path';
import genius from '../pages/genius/router';

const paths = [];

paths.push(...defaultRouter);
paths.push(...tipbu_6streams_path);
paths.push(...RMS);
paths.push(...EnergyManagement);
paths.push(...WarehouseManagement);
paths.push(...genius);
paths.push(...vision);
// paths.push(...project);
// paths.push(...example);

export default paths;
