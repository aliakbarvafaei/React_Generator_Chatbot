<FORM_LOADER>
  <LAYOUT>
    <LAYOUT_ROW>
      <LAYOUT_CELL>
        <TYPOGRAPHY variant="h5" align="center">
          ورود به حساب کاربری
        </TYPOGRAPHY>
      </LAYOUT_CELL>
    </LAYOUT_ROW>
    <LAYOUT_ROW>
      <LAYOUT_CELL>
        <TEXT_BOX
          label="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
      </LAYOUT_CELL>
    </LAYOUT_ROW>
    <LAYOUT_ROW>
      <LAYOUT_CELL>
        <TEXT_BOX
          label="رمز عبور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </LAYOUT_CELL>
    </LAYOUT_ROW>
    <LAYOUT_ROW>
      <LAYOUT_CELL>
        <BUTTON onClick={handleLogin} fullWidth>
          ورود
        </BUTTON>
      </LAYOUT_CELL>
    </LAYOUT_ROW>
    <LAYOUT_ROW>
      <LAYOUT_CELL>
        <HYPER_LINK href="/forgot-password" align="center">
          فراموشی رمز عبور؟
        </HYPER_LINK>
      </LAYOUT_CELL>
    </LAYOUT_ROW>
  </LAYOUT>
</FORM_LOADER>