function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            logMessages: []
        }
    },
    computed:{
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%'}
        },
        mayUseSuperAttack(){
            return this.currentRound % 3 === 0;
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.logMessages = [];
        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.addLogMessages('monster', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,12);
            this.playerHealth -= attackValue;
            this.addLogMessages('player', 'attack', attackValue);

        },
        superAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            const healValue = getRandomValue(8,20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessages('player', 'heal', healValue);
        },
        addLogMessages(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
}  
})

app.mount('#game')