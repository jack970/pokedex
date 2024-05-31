export default interface IEspecie {
    capture_rate: number;
    growth_rate: {
        name: string;
        url: string;
    }
    base_happiness: number;
    evolution_chain: {
        url: string;
    }
}