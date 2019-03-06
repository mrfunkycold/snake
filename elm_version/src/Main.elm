module Main exposing (main)

import Browser
import Browser.Events exposing (onAnimationFrame, onKeyDown)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode as Decode
import Subscriptions exposing (..)
import Types exposing (Direction(..), GameState(..), Model, Msg(..))
import Update exposing (init, update)
import Views.Board exposing (board)
import Views.Scoreboard exposing (scoreboard)
import Views.TransitionScreen exposing (transitionScreen)



-- Main View


playingarea : Model -> Html Msg
playingarea model =
    div []
        [ scoreboard model
        , board model
        , transitionScreen model
        ]


initForMain : () -> ( Model, Cmd Msg )
initForMain _ =
    ( init, Cmd.none )


main =
    Browser.element
        { init = initForMain
        , view = playingarea
        , update = update
        , subscriptions = subscriptions
        }
