import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

export const GenderRate = () => {
  if (rate === -1) {
    return <>Genderless</>;
  }

  const femaleRate = (rate / 8) * 100;
  const maleRate = ((8 - rate) / 8) * 100;

  return (
    <>
      <BsGenderFemale /> {femaleRate}% <BsGenderMale /> {maleRate}%
    </>
  );
};
