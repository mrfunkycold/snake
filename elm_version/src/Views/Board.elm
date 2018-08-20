module Views.Board exposing (board)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Model exposing (Apple, Snake)
import Util exposing (isSnakeAtPosition, isTheApple)


type alias BoardProps =
    { row : Int
    , col : Int
    , apple : Apple
    , snake : Snake
    }


type Filled
    = Apple
    | Snake
    | Nothing


boardcol : Filled -> Html msg
boardcol filled =
    let
        className =
            "snake__board-col"

        colClassName =
            case filled of
                Apple ->
                    className ++ " snake__board-col-apple"

                Snake ->
                    className ++ " snake__board-col-snake"

                Nothing ->
                    className
    in
    div [ class colClassName ] []


boardrow : BoardProps -> Html msg
boardrow { snake, apple, row, col } =
    let
        getFilled currentCol =
            let
                gridItem =
                    { row = row, col = currentCol }
            in
            if isTheApple apple gridItem then
                Apple
            else if isSnakeAtPosition gridItem snake then
                Snake
            else
                Nothing
    in
    div
        [ class "snake__board-row" ]
        (List.map
            (\x -> getFilled x |> boardcol)
            (List.range 0 col)
        )


board : BoardProps -> Html msg
board props =
    div
        [ class "snake__board" ]
        (List.map
            (\r -> { props | row = r } |> boardrow)
            (List.range 0 props.row)
        )