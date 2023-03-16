/** @odoo-module**/

const { Component, xml, mount, useState } = owl;

let audio='';
class Player extends Component {
    static template = xml`
        <div style="position:absolute;bottom:0px">
            <h2 id="song-title">Song Title</h2>
            <div>
                <button id="pause-button" t-on-click="pauseThisSong">Pause</button><span> </span>
                <button id="play-button" t-on-click="playThisSong">Play</button><span> </span>
                <button id="stop-button" t-on-click="stopThisSong">Stop</button><span> </span>
            </div>
        </div>
    `;

    playThisSong(){
        if(!audio){
            return;
        }
        audio.play();
    }
    
    pauseThisSong(){
        if(!audio){
            return;
        }
        audio.pause();
    }
    
    stopThisSong(){
        if(!audio){
            return;
        }
        audio.pause();
        audio.currentTime=0;
    }
}

class MusicList extends Component {
    static template = xml`
        <div id="MusicList" style="float:left">
            <t t-if="props.searchData[0] and props.searchData[0] !== 'Song Not Found'">
                <h2>List of Songs</h2>
                <t t-foreach="props.searchData[0]" t-as="song" t-key="song.id">
                    <p><t t-out="song.name"/></p>
                    <button t-att-value="song.url" t-on-click="addSongToPlaylist">Add to playlist</button><span> </span>
                    <button t-att-value="song.url" t-on-click="playSong">Play Song</button>
                </t>
            </t>
            <Player/>
        </div>
    `;

    playSong(ev) {
        const selectedSongUrl = ev.target.getAttribute('value');
        const selectedSong = this.props.searchData[0].find(song => song.url===selectedSongUrl);
        document.getElementById("song-title").textContent = selectedSong.name;
        audio = new Audio(selectedSongUrl);
        audio.play();
    }

    addSongToPlaylist(ev) {
        const selectedSongUrl = ev.target.getAttribute('value');
        this.props.updateAddToPlaylist(selectedSongUrl);
    }

    static props = ["searchData", "updateAddToPlaylist"];

    static components = { Player };
}

class Search extends Component {
    static template = xml`
        <div style="border:1px,solid,black; text-align:center">
            <input type="text" id="searchSong" placeholder="Search Music" value="Freedom"/><span> </span>
            <button t-on-click="getMusic" id="SearchButton">Search</button>
            <MusicList searchData="searchData" updateAddToPlaylist="updateAddToPlaylist"/>
        </div>
    `;

    setup() {
        this.searchData = useState([]);
    }

    async getMusic() {
        const findSong = document.getElementById("searchSong").value;
        const response = await fetch(`/music/search?song_name=${findSong}`);
        const {result: newData} = await response.json();
        this.searchData.pop();
        this.searchData.push(newData);
    }

    updateAddToPlaylist()

    static components = { MusicList };
}

class Root extends Component {
    static template = xml`
    <div>
        <Search/>
    </div>
    `;

    static components = { Search };
}

window.onload = function() {
    mount(Root, document.body);
};