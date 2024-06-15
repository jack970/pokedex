'use client'

import Image from "next/image";
import style from './style.module.css'
import { FaSearch } from "react-icons/fa";
import { useCallback, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface SearchProps {
    value: string,
    handleChange(e: string): void;
}

const Header = ({ value, handleChange }: SearchProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const onChangeFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const onChangeBlur = useCallback(() => {
        setIsFocused(false)
    }, [])

    return (
        <header className={style.header}>
            <div className={style.wrapper}>
                <Image src="/pokemon-logo.png" height={80} width={160} alt="logo pokedex" />
            </div>
            <div className={style.input}>
                <div className={style.icon}>
                    <FaSearch size={22} />
                </div>
                <input
                    type="text"
                    value={value}
                    placeholder={`${isFocused ? '' : "Pesquisar..."} `}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={onChangeBlur}
                    onFocus={onChangeFocus}
                />
                {
                    value.length > 0 &&
                    <div
                        onClick={() => handleChange("")}
                        className={style.icon}>
                        <IoMdClose size={30} />
                    </div>
                }

            </div>
        </header >
    )
}

export default Header