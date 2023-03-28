import { categories } from "../../data";
import CategoryItem from "../categoryitem/CategoryItem";
import "./Categories.scss";

const Categories: React.FC = () => {
  return (
    <div className="CategoryContainer">
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Categories;
