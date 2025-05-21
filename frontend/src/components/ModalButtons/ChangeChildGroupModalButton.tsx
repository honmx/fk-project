import { FC, useState } from "react";

interface Props {

}

const ChangeChildGroupModalButton: FC<Props> = ({ }) => {

  const [isChangeChildGroupModalActive, setIsChangeChildGroupModalActive] = useState<boolean>(false);

  // const handleOpenChangeChildGroupModalClick = (e?: MouseEvent<HTMLDivElement>) => {
  //   setIsChangeChildGroupModalActive(prev => !prev);
  //   clearStatesAndStopPropagation(e);
  // }

  return (
    <div>
      
    </div>
  )
};

export default ChangeChildGroupModalButton;