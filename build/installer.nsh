!include "MUI2.nsh"

!macro customInit
  nsExec::ExecToLog 'taskkill /F /IM "Silver App.exe"'
  Sleep 1000
  StrCpy $INSTDIR "$EXEDIR\..\_runtime"
!macroend

!macro customInstall
  CreateShortCut "$INSTDIR\..\Silver App.lnk" "$INSTDIR\Silver App.exe" "" "$INSTDIR\Silver App.exe" 0
  nsExec::ExecToLog 'attrib +h "$INSTDIR"'
!macroend
