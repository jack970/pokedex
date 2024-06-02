'use client'

import { useState } from "react";
import Header from "../components/Header";
import style from './style.module.css'
import Link from "next/link";

export default function NotFound() {
    const [search, setSearch] = useState<string>("")

    return (
        <>
            <Header value={search} handleChange={setSearch} />
            <div className={style.main}>
                <h1 className={style.title}>404</h1>
                <h3>Página não encontrada</h3>
                <Link href='/' className={style.button}>Voltar</Link>
            </div>
        </>
    );
}