import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders 
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex
        flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, 
            consectetur adipisicing elit. 
            Magni minima odit recusandae. 
            Illum ipsa non repudiandae? 
            Eum ipsam iste quos suscipit tempora? 
            Aperiam esse fugiat inventore laboriosam 
            officiis quam rem!
          </p>
          <p>
            Lorem ipsum dolor sit amet, 
            consectetur adipisicing elit. 
            Magni minima odit recusandae. 
            Illum ipsa non repudiandae? 
            Eum ipsam iste quos suscipit tempora? 
            Aperiam esse fugiat inventore laboriosam 
            officiis quam rem!
          </p>
        </div>
      </section>
      <section className="text-center my-8">
      <SectionHeaders 
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500"
          href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
      <footer className="border-t p-8 text-center text-gray-500
      mt-16">
        &copy; 2024 All rights reserved
      </footer>
    </>
  );
}
