@if($paginator->hasPages())
@php
$url2 = "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";

$page2= explode("page=", $url2);
$p=intval($page2[count($page2)-1]);
if($p==0){
  $p++;
}

$search = explode("/", $url2);
$temp= explode("?", $search[4]);
$search[4] = $temp[0];

if($search[4]=="all" || $search[4]!="search"){
  $temp=explode("?",$url2);
  $url2= $temp[0]."?";
  
}else{
  $temp=explode("&page",$url2);
  $url2= $temp[0]."&";                 
}        
@endphp

<ul class="pagination">
  <!-- Prevoius Page Link -->
  @if($paginator->onFirstPage())
    <li class="page-item disabled"><a class="page-link"><span><</span></a></li>
  @else
    <li class="page-item"><a href="{{ $url2.'page='.$p-1 }}" class="page-link" rel="prev"><</a></li>
  @endif

  <!-- Pagination Elements Here -->
  @foreach($elements as $element)
       <!-- Make three dots -->
       @if(is_string($element))
          <li class="page-item disabled"><a  class="page-link"><span>{{$element}}</span></a></li>
       @endif

       <!-- Links Array Here -->
       @if(is_array($element))       
       
           @foreach($element as $page=>$url)           
              @if($page == $paginator->currentPage())
                  <li class="page-item active"><a class="page-link"><span>{{ $page }}</span></a></li>
              @else
                @if($search[4] == "all" || $search[4] == "search")                
                  <li class="page-item"><a href=" {{$url2.'page='.$page}}" class="page-link">{{ $page }}</a></li>
                @else
                  <li class="page-item"><a href=" {{$url}}" class="page-link">{{ $page }}</a></li>
                @endif
              @endif
           @endforeach
       @endif

  @endforeach

  <!-- Next Page Link -->
  @if($paginator->hasMorePages())
    <li class="page-item"><a href=" {{ $url2.'page='.$p+1 }} " class="page-link"><span>></span></a></li>
  @else
  <li class="page-item disabled"><a class="page-link"><span>></span></a></li>
  @endif
</ul>

@endif