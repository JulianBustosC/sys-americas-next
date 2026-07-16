"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("jwt") !== null;
    setIsAuth(auth);
    if (!auth) router.push("/login");
  }, [router]);

  if (isAuth === null) return null; // o un loader
  return <h1>Bienvenido</h1>;
}