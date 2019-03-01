let tick = { 
    //props:[ticketdata],
    template: `
    <div v-bind:class="[tikClass, colorClass]">   
        <p>
            {{ticketdata.submit}}
        </p>
        <div> 
            <div class="time">
                {{hours}}:{{minutes}}:{{seconds}} s
            </div>
            <button class="btn btn-outline-success my-2 my-sm-0">+</button>
            <button class="btn btn-outline-success my-2 my-sm-0">&#10003</button>
        </div>
    </div>`
    , data() {
        return {
            totalTime:0,
            tikClass:'tik',
            colorClass:null
        }
    }
    ,props:{
        ticketdata:{
            type:Object,
            required:true
        }
    }
    ,
    methods: {
        startTimer: function () {
            this.timer = setInterval(() => this.countdown(), 1000);
        },
        padTime: function (time) {
            return (time < 10 ? '0' : '') + time;
        },
        countdown: function () {
            if (this.totalTime >= 1) {
                this.totalTime--;
            } else {
                this.totalTime = 0;

            }
        },
        getTime(timeEnd,timeAc){
            var timeEnd= new Date(timeEnd).getTime();
            var timeAc= new Date(timeAc).getTime();
            return ((timeEnd-timeAc)/1000);
        }
    },
    computed: {
        hours: function () {
            const hours = Math.floor(this.totalTime / 3600);
            return this.padTime(hours);
        },
        minutes: function () {
            const minutes = Math.floor((this.totalTime-(this.hours * 3600) )/60 );
            return this.padTime(minutes);
        },
        seconds: function () {
            const seconds = this.totalTime - (this.minutes * 60) - (this.hours * 3600);
            return this.padTime(seconds);
        }
    }, mounted() {
        var d = new Date();
        this.totalTime=this.getTime(this.ticketdata.time,this.ticketdata.timeAc);
        this.colorClass= (this.ticketdata.status == 0 ? 'tickg' : (this.ticketdata.status == 1 ? 'tickw' : 'tickb'));//tickg tickw tickb
        this.startTimer();
    }
};


var board = new Vue({
    el: "#board",
    components: {
        'ticket': tick,
    },
    data: {
        nav:{
            title: " Works",
            home: "home",
            Link: "Link",
            work: "",
            complet:"Works Complets"
        },
        ticketsP: null,
        ticketsC:null,
        inprogress: true
    },methods: {
        getDat(){
            var d =new Date()
            var f = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
            var h = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
            console.log('t: '+(f+' '+h))
            return f+' '+h
        },
        chwindow(){
            this.inprogress= !this.inprogress;
            this.nav.complet = (this.inprogress ? "Works Complets":"Works In Process");
        }
    },mounted(){
        this.ticketsP = [{
            id:1,
            submit:"Terminar la tarea de calculo ",
            status:0,//-1:incomplet (black), 0:good (green),1:caution(yellow),2:warning (red),3:complet(fucsia)
            time: '2019-01-25 18:00:00',
            timeAc: this.getDat()
        }, {
            id:2,
            submit:"My lady, solo si lees esto te dire que te quiero <  3, sino te lo perderas por despistada Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quia, fuga quasi in sunt quibusdam est obcaecati veniam tenetur quos consequatur? Omnis sint nisi vero deleniti reprehenderit dolorum doloribus blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quia, fuga quasi in sunt quibusdam est obcaecati veniam tenetur quos consequatur? Omnis sint nisi vero deleniti reprehenderit dolorum doloribus blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quia, fuga quasi in sunt quibusdam est obcaecati veniam tenetur quos consequatur? Omnis sint nisi vero deleniti reprehenderit dolorum doloribus blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quia, fuga quasi in sunt quibusdam est obcaecati veniam tenetur quos consequatur? Omnis sint nisi vero deleniti reprehenderit dolorum doloribus blanditiis?",
            status:1,
            time: '2019-02-23 13:00:00',
            timeAc: this.getDat()
        }, {
            id:3,
            submit:"Marla, this is a messange for you, but it is hidden, in this page",
            status:2,
            time: '2019-01-25 15:50:30',
            timeAc: this.getDat()
        },]
        
        ,
        this.ticketsC = [{
            id:4,
            submit:"Entrga del informe",
            status:2,//-1:incomplet (black), 0:good (green),1:caution(yellow),2:warning (red),3:complet(fucsia)
            time: '2018-12-10 18:00:00',
            timeAc: this.getDat()
        }]
        
        /*,axios
            .get('')
            .then(response =>(
                this.ticketsP=response.data.inprocess,
                this.ticketsC=response.data.compets
                ));
        */
    }
});