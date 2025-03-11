from time import sleep
from random import randint
import os

def limpar_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')

print('-=-' * 11)
print('\033[32mVAMOS\033[m \033[33mJOGAR\033[m \033[31mJOKENPÔ\033[m'.center(57))
print('-=-' * 11)
sleep(1)
while True:
    print('===== <<< \033[34mESCOLHA ENTRE\033[m >>> =====')
    print('\033[34m[ 1 ]\033[m PEDRA \n\033[34m[ 2 ]\033[m PAPEL \n\033[34m[ 3 ]\033[m TESOURA')
    print('=' * 33)

    while True: # Verificação da opção do jogador.
        jogador = input('DIGITE AQUI: ')
        if jogador.isdigit():
            jogador = int(jogador)
            if jogador in [1,2,3]:
                break
        print('\033[31mERRO! Opção Inválida...\nEscolha apenas [ 1 ], [ 2 ] ou [ 3 ]\033[m')

    limpar_terminal()

    escolha = {1: 'PEDRA', 2: 'PAPEL', 3: 'TESOURA'}
    print(f'\033[34mOK!\033[m Você escolheu \033[34m{escolha[jogador]}\033[m')
    sleep(1)
    print('BORA LA...')

    print()
    sleep(1)
    print('\033[32mJO\033[m', end = ' - ', flush=True)
    sleep(1)
    print('\033[33mKEN\033[m', end = ' - ', flush=True)
    sleep(1)
    print('\033[31mPÔ\033[m', flush=True)
    sleep(1)
    print()

    computador = randint(1,3) # O computador gera um número aleatorio.

    vitoria = {1: 3, 2: 1, 3: 2} # Validação de vitória.

    if jogador == computador:
        print('\033[31m======= <<<< EMPATE >>>> =======\033[m')
    elif computador == vitoria [jogador]:
        print('\033[32m======= <<<< VITORIA >>>> =======\033[m')
    else:
        print('\033[31m======= <<<< GAME OVER >>>> =======\033[m')
    print()
    print(f'O COMPUTADOR escolheu \033[34m{escolha[computador]}!\033[m')
    print()

    while True: # Perguntar se que jogar novamente.
        continuar = input('Vamos jogar novamente [S/N]? ').strip().upper()[0]
        if continuar in 'SN':
            break
        print('\033[31mERRO! Responda apenas \'S\' ou \'N\'.\033[m')
    print()
    if continuar == 'N':
        print('Foi \033[34mMUITO BOM JOGAR\033[m com Você.')
        sleep(0.5)
        print('Espero que volte \033[34m+VEZES!\033[m')
        sleep(1)
        break
