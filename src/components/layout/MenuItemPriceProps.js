import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import { invalidNumericInputMsg, invalidTextInputMsg, setCustomValidityMsgForElementList } from "@/libs/validation";
import { useEffect, useState } from "react";

export default function MenuItemPriceProps({ name, idPrefix, addLabel, props, setProps }) {

  const [isOpen, setIsOpen] = useState(false);
  const [propsState, setPropsState] = useState(false);

  function addProp() {
    setProps(oldProps => {
      return [...oldProps, { name: '', price: 0 }];
    });
    setPropsState(!propsState);
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    setPropsState(!propsState);
  }

  useEffect(() => {
    const sizeNameElements = document.querySelectorAll("[id='sizeName']");
    setCustomValidityMsgForElementList(sizeNameElements, "Size name", invalidTextInputMsg);

    const sizePriceElements = document.querySelectorAll("[id='sizePrice']");
    setCustomValidityMsgForElementList(sizePriceElements, "Size price", invalidNumericInputMsg);

    const ingredientNameElements = document.querySelectorAll("[id='ingredientName']");
    setCustomValidityMsgForElementList(ingredientNameElements, "Extra ingredient name", invalidTextInputMsg);

    const ingredientPriceElements = document.querySelectorAll("[id='ingredientPrice']");
    setCustomValidityMsgForElementList(ingredientPriceElements, "Extra ingredient price", invalidNumericInputMsg);
  }, [propsState]);

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex p-1 border-0 justify-start"
        type="button">
        {isOpen && (
          <ChevronUp />
        )}
        {!isOpen && (
          <ChevronDown />
        )}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 && props.map((size, index) => (
          <div key={index} className="flex items-end gap-2">
            <div>
              <label>Name</label>
              <input
                id={idPrefix + "Name"}
                pattern="^[a-zA-Z ]*$"
                required
                type="text"
                placeholder="Name"
                value={size.name}
                onChange={ev => editProp(ev, index, 'name')}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                id={idPrefix + "Price"}
                pattern="^[0-9]*$"
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={ev => editProp(ev, index, 'price')}
              />
            </div>
            <div>
              <button type="button"
                onClick={() => removeProp(index)}
                className="bg-white mb-2 px-2">
                <Trash />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center">
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}