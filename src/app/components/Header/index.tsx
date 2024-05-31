import Image from "next/image";
import style from './style.module.css'
import { FaSearch } from "react-icons/fa";

interface SearchProps {
    value: string,
    handleChange(e: string): void;
}

const Header = ({ value, handleChange }: SearchProps) => {
    return (
        <header className={style.header}>
            <div className={style.wrapper}>
                <Image src="/pokemon-logo.png" height={80} width={160} alt="logo pokedex" />
            </div>
            <div className={style.input}>
                <FaSearch size={30} />
                <input
                    type="text"
                    value={value}
                    placeholder="Pesquisar..."
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
        </header>
    )
}

export default Header