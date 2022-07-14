import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from 'next/router'


export default function Home({ countries }) {
  const router = useRouter()

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

