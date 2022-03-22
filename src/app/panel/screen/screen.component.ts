import { Component } from '@angular/core';
import { MediaService } from 'src/app/media.service';
import { RemoteService } from 'src/app/remote.service';

@Component({
  selector: 'app-panel-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class PanelScreenComponent {
  constructor(private media: MediaService, private remote: RemoteService) {}

  public allSongs = this.media.setList;
  public currentSong = this.media.getCurrentSong();
  current = this.remote.state;

  ngOnInit(): void {
    this.media.updater.subscribe((currentSong) => {
      this.currentSong = currentSong;
      for (const button of Array.from(document.querySelectorAll('.screen ul li button') as NodeListOf<HTMLButtonElement>)) {
        if (button.innerHTML === currentSong.name) button.focus();
      }
    });

    this.remote.updater.subscribe((state) => {
      this.current = state;
    });
  }
}
