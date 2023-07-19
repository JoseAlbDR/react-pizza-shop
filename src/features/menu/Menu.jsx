import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  return <h1>Menu</h1>;
}

export async function loader() {
  try {
    const menu = await getMenu();
    return menu;
  } catch (e) {
    console.error(e.message);
  }
}

export default Menu;
