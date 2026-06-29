!macro customInit
  ; Kill Silver App if running
  nsExec::ExecToLog 'taskkill /F /IM "Silver App.exe"'
  Sleep 1000
  ; Install into App/_runtime (parent of latest/ where setup lives)
  StrCpy $INSTDIR "$EXEDIR\..\_runtime"
!macroend

!macro customInstall
  ; Create shortcut in App/ (parent of _runtime)
  CreateShortCut "$INSTDIR\..\Silver App.lnk" "$INSTDIR\Silver App.exe" "" "$INSTDIR\Silver App.exe" 0
  ; Hide _runtime folder
  nsExec::ExecToLog 'attrib +h "$INSTDIR"'
!macroend
