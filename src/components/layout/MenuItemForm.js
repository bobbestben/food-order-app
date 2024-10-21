import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { invalidNumericInputMsg, invalidSentenceInputMsg, invalidTextInputMsg, setCustomValidityMsg } from "@/libs/validation";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem, categories }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [category, setCategory] = useState(menuItem?.category || categories[0]?._id || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

  useEffect(() => {
    setImage(menuItem?.image || '');
    setName(menuItem?.name || '');
    setDescription(menuItem?.description || '');
    setCategory(menuItem?.category || categories[0]?._id || '');
    setBasePrice(menuItem?.basePrice || '');
    setSizes(menuItem?.sizes || []);
    setExtraIngredientPrices(menuItem?.extraIngredientPrices || []);
  }, [menuItem, categories]);

  useEffect(() => {
    setCustomValidityMsg("itemName", "Item name", invalidTextInputMsg);
    setCustomValidityMsg("itemDescription", "Description", invalidSentenceInputMsg);
    setCustomValidityMsg("basePrice", "Base price", invalidNumericInputMsg);
  }, []);

  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image, name, description, basePrice, sizes, extraIngredientPrices, category,
        })
      }
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}>
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            id="itemName"
            pattern="^[a-zA-Z ]*$"
            required
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            id="itemDescription"
            pattern="^[\x20-\x7E]*$"
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            id="basePrice"
            pattern="^[0-9]*$"
            required
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={'Sizes'}
            idPrefix={'size'}
            addLabel={'Add item size'}
            props={sizes}
            setProps={setSizes} />
          <MenuItemPriceProps
            name={'Extra ingredients'}
            idPrefix={'ingredient'}
            addLabel={'Add ingredients prices'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices} />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}