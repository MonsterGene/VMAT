import example from './example';
import project from '../../pages/project/menu';
import tipbu_6streams_menu from '../../pages/tipbu_6streams/menu';
const Menu = [];

Menu.push(...tipbu_6streams_menu);
// Menu.push(...project);
// Menu.push(...example);

// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
