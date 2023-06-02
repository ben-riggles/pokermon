import random


def random_pokemon() -> str:
    with open('./app/assets/pokemon_list.txt', 'r') as f:
        pokemon = f.read().splitlines()
    return pokemon[random.randint(0, len(pokemon)-1)]

def validate_pokemon(val: str) -> bool:
    with open('./app/assets/pokemon_list_extended.txt', 'r') as f:
        pokemon = f.read().splitlines()
    return val.lower() in pokemon
