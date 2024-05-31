export interface DoubleDamage {
    name: string;
    url: string
}

export interface DamageRelations {
    double_damage_from: DoubleDamage[];
    double_damage_to: DoubleDamage[];
    half_damage_from: DoubleDamage[];
    half_damage_to: DoubleDamage[];

}

export default interface ITipo {
    damage_relations: DamageRelations
}