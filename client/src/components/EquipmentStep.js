

export function EquipmentStep(props) {
  

    return (
        <div className="nameEquipment">
            <label htmlFor="name">Equipment {props.num}</label>
            <input name="name" id="name"/>
        </div>
    )
  };