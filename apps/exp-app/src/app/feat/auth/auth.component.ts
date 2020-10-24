import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FeatAuthContainer } from '@nx-feat/auth'
import { AuthWithEmailAndPassword } from '@nx-fire/auth'

@Component({
  selector: 'nx-az-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent extends FeatAuthContainer implements OnInit {
  ngOnInit(): void {}

  onChange(data: Partial<AuthWithEmailAndPassword>) {
    console.log('changed: ', data)
  }

  onSubmit(data: AuthWithEmailAndPassword) {
    console.log('submited: ', data)
    this._fa.login(data)
  }
}
