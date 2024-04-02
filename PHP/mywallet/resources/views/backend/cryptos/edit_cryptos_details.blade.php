@extends('admin.admin_master')
@section('admin')

<div class="content-wrapper">
    <div class="container-full">
        <section class="content">
            <!-- Main content -->
            <div class="box">
                @foreach ($userCryptos as $cryptos)
                <form method="POST" action="{{ route('cryptos.edit.submit', $cryptos->id) }}">
                    @csrf
                    
                    <h3 class="box-header">Editar Criptomoeda com Identificador {{ $cryptos->id }}</h3>
                    <div class="box-body">

                        <div class="form-group pb-10">
                            <h5>Categoria</h5>
                            <div class="controls">
                                <select name="category" id="categories" class="form-control">
                                    @foreach ($userCategories as $cat )
                                    <option value="{{ $cat->id }}" @if ($cat->id == $cryptos->catId)
                                        selected="selected"
                                        @endif
                                        >{{ $cat->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group pb-10">
                            <h5>Criptomoeda</h5>
                            <div class="controls">
                                <select name="name" id="categories" class="form-control">
                                    <option value="{{ $cryptos->name }}">{{ $cryptos->name }}
                                    </option>
                                    <option value="ADA">ADA</option>
                                    <option value="ADC">ADC</option>
                                    <option value="AEON">AEON</option>
                                    <option value="AMP">AMP</option>
                                    <option value="ANC">ANC</option>
                                    <option value="ARCH">ARCH</option>
                                    <option value="ARDR">ARDR</option>
                                    <option value="ARK">ARK</option>
                                    <option value="AUR">AUR</option>
                                    <option value="BANX">BANX</option>
                                    <option value="BAT">BAT</option>
                                    <option value="BAY">BAY</option>
                                    <option value="BC">BC</option>
                                    <option value="BCN">BCN</option>
                                    <option value="BFT">BFT</option>
                                    <option value="BRK">BRK</option>
                                    <option value="BSD">BSD</option>
                                    <option value="BTA">BTA</option>
                                    <option value="BTC">BTC</option>
                                    <option value="BTCD">BTCD</option>
                                    <option value="BTM">BTM</option>
                                    <option value="BTS">BTS</option>
                                    <option value="CLAM">CLAM</option>
                                    <option value="CLOAK">CLOAK</option>
                                    <option value="DAO">DAO</option>
                                    <option value="DASH">DASH</option>
                                    <option value="DCR">DCR</option>
                                    <option value="DCT">DCT</option>
                                    <option value="DGB">DGB</option>
                                    <option value="DGD">DGD</option>
                                    <option value="DMD">DMD</option>
                                    <option value="DOGE">DOGE</option>
                                    <option value="EMC">EMC</option>
                                    <option value="EOS">EOS</option>
                                    <option value="ERC">ERC</option>
                                    <option value="ETC">ETC</option>
                                    <option value="ETH">ETH</option>
                                    <option value="EUR">EUR</option>
                                    <option value="FC2">FC2</option>
                                    <option value="FCT">FCT</option>
                                    <option value="FLO">FLO</option>
                                    <option value="FRK">FRK</option>
                                    <option value="FTC">FTC</option>
                                    <option value="GAME">GAME</option>
                                    <option value="GBYTE">GBYTE</option>
                                    <option value="GDC">GDC</option>
                                    <option value="GEMZ">GEMZ</option>
                                    <option value="GLD">GLD</option>
                                    <option value="GNO">GNO</option>
                                    <option value="GNT">GNT</option>
                                    <option value="GOLOS">GOLOS</option>
                                    <option value="GRC">GRC</option>
                                    <option value="GRS">GRS</option>
                                    <option value="HEAT">HEAT</option>
                                    <option value="ICN">ICN</option>
                                    <option value="IFC">IFC</option>
                                    <option value="INCNT">INCNT</option>
                                    <option value="IOC">IOC</option>
                                    <option value="IOTA">IOTA</option>
                                    <option value="JBS">JBS</option>
                                    <option value="KMD">KMD</option>
                                    <option value="KOBO">KOBO</option>
                                    <option value="KORE">KORE</option>
                                    <option value="LBC">LBC</option>
                                    <option value="LDOGE">LDOGE</option>
                                    <option value="LSK">LSK</option>
                                    <option value="LTC">LTC</option>
                                    <option value="MAID">MAID</option>
                                    <option value="MCO">MCO</option>
                                    <option value="MINT">MINT</option>
                                    <option value="MONA">MONA</option>
                                    <option value="MRC">MRC</option>
                                    <option value="MSC">MSC</option>
                                    <option value="MTR">MTR</option>
                                    <option value="MUE">MUE</option>
                                    <option value="NBT">NBT</option>
                                    <option value="NEO">NEO</option>
                                    <option value="NEOS">NEOS</option>
                                    <option value="NEU">NEU</option>
                                    <option value="NLG">NLG</option>
                                    <option value="NMC">NMC</option>
                                    <option value="NOTE">NOTE</option>
                                    <option value="NVC">NVC</option>
                                    <option value="NXT">NXT</option>
                                    <option value="OK">OK</option>
                                    <option value="OMG">OMG</option>
                                    <option value="OMNI">OMNI</option>
                                    <option value="OPAL">OPAL</option>
                                    <option value="PART">PART</option>
                                    <option value="PINK">PIGGY</option>
                                    <option value="PINK">PINK</option>
                                    <option value="PIVX">PIVX</option>
                                    <option value="POT">POT</option>
                                    <option value="PPC">PPC</option>
                                    <option value="QRK">QRK</option>
                                    <option value="QTUM">QTUM</option>
                                    <option value="SALT">SALT</option>
                                    <option value="SAR">SAR</option>
                                    <option value="SCOT">SCOT</option>
                                    <option value="SDC">SDC</option>
                                    <option value="SIA">SIA</option>
                                    <option value="SJCX">SJCX</option>
                                    <option value="SLG">SLG</option>
                                    <option value="SLS">SLS</option>
                                    <option value="SNRG">SNRG</option>
                                    <option value="START">START</option>
                                    <option value="STEEM">STEEM</option>
                                    <option value="STR">STR</option>
                                    <option value="STRAT">STRAT</option>
                                    <option value="SWIFT">SWIFT</option>
                                    <option value="SYNC">SYNC</option>
                                    <option value="SYS">SYS</option>
                                    <option value="TRIG">TRIG</option>
                                    <option value="TX">TX</option>
                                    <option value="UBQ">UBQ</option>
                                    <option value="UNITY">UNITY</option>
                                    <option value="USDT">USDT</option>
                                    <option value="VIOR">VIOR</option>
                                    <option value="VNL">VNL</option>
                                    <option value="VPN">VPN</option>
                                    <option value="VRC">VRC</option>
                                    <option value="VTC">VTC</option>
                                    <option value="WAVES">WAVES</option>
                                    <option value="XAI">XAI</option>
                                    <option value="XBS">XBS</option>
                                    <option value="XCP">XCP</option>
                                    <option value="XEM">XEM</option>
                                    <option value="XMR">XMR</option>
                                    <option value="XPM">XPM</option>
                                    <option value="XRP">XRP</option>
                                    <option value="XTZ">XTZ</option>
                                    <option value="XZC">XZC</option>
                                    <option value="YBC">YBC</option>
                                    <option value="ZEC">ZEC</option>
                                    <option value="ZEIT">ZEIT</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group pb-10">
                            <h5>Valor</h5>
                            <input type="text" name="amount" class="form-control"
                                placeholder="{{ $cryptos->amount }} €">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Data de Criação</h5>
                            <input type="date" name="startDate" class="form-control" value="{{ $cryptos->startDate }}">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Hora de Criação</h5>
                            <input type="time" name="startTime" class="form-control" value="{{ $cryptos->startTime }}">
                        </div>

                        <div class="form-group pb-10">
                            <h5>Data de Fecho</h5>
                            <input type="date" name="endDate" class="form-control" value="{{ $cryptos->endDate }}">
                        </div>

                        <div class="form-group ">
                            <h5>Hora de Fecho</h5>
                            <input type="time" name="endTime" class="form-control" value="{{ $cryptos->endTime }}">
                        </div>

                        @endforeach
                    </div>
                    <!-- /.box-body -->
                    <div class="col-md-6" style="margin-bottom: 20px; margin-left: 5px">
                        <div class="text-xs-right">
                            <input type="submit" class="btn btn-rounded btn-info mb-5" value="Aceitar Alterações">
                        </div>
                    </div> <!-- End Col Md-6 -->
                </form>
                <!-- /.content -->
            </div>
        </section>
    </div>
</div>


@endsection