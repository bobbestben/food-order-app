import { invalidAlphaNumericInputMsg, invalidNumericInputMsg, invalidTextInputMsg, setCustomValidityMsg } from "@/libs/validation";
import { useEffect } from "react";

export default function AddressInputs({ addressProps, setAddressProp, required = false, disabled = false }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  useEffect(() => {
    setCustomValidityMsg("phone", "Phone number", invalidNumericInputMsg);
    setCustomValidityMsg("streetAddress", "Street address", invalidAlphaNumericInputMsg);
    setCustomValidityMsg("postalCode", "Postal code", invalidNumericInputMsg);
    setCustomValidityMsg("city", "City", invalidTextInputMsg);
    setCustomValidityMsg("country", "Country", invalidTextInputMsg);
  }, []);

  return (
    <>
      <label>Phone number</label>
      <input
        id="phone" pattern="^[0-9]*$"
        required={required}
        disabled={disabled}
        type="tel" placeholder="Phone number"
        value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)} />
      <label>Street address</label>
      <input
        id="streetAddress" pattern="^[a-zA-Z0-9 ]*$"
        required={required}
        disabled={disabled}
        type="text" placeholder="Street address"
        value={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            id="postalCode" pattern="^[0-9]*$"
            required={required}
            disabled={disabled}
            type="text" placeholder="Postal code"
            value={postalCode || ''} onChange={ev => setAddressProp('postalCode', ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            id="city" pattern="^[a-zA-Z ]*$"
            required={required}
            disabled={disabled}
            type="text" placeholder="City"
            value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        id="country" pattern="^[a-zA-Z ]*$"
        required={required}
        disabled={disabled}
        type="text" placeholder="Country"
        value={country || ''} onChange={ev => setAddressProp('country', ev.target.value)}
      />
    </>
  );
}