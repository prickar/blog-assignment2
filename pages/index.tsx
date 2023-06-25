import Heading from "@components/heading";
import style from "./image.module.css"
import Image from "next/image"

export default function Home() {
  return (
    <div>
  <Heading>Home</Heading>
  <div className={style.image}>
    <Image
    src="/purpleBowl.png"
    width={400}
    height={400}
    alt="Plate" 
    />
  </div>
  </div>
  )
}
